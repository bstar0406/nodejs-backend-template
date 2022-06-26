import prices from "../models/prices"

class PricesRepository {
    constructor() {}

    getFloorPrices = async (
        chain: String,
        address: String
    ) => {
        const currentDate = new Date().getTime()
        const dateBefore24h = new Date(currentDate - 24 * 60 * 60 * 1000)
        const dateBefore7d = new Date(currentDate - 7 * 24 * 60 * 60 * 1000)
        const dateBefore30d = new Date(currentDate - 30 * 24 * 60 * 60 * 1000)

        return prices.aggregate([{
            $addFields: {
                floor24h: {
                    $cond: [ { $lt: ['$updatedAt', dateBefore24h] }, '$price', 0 ]
                },
                floor7d: {
                    $cond: [ { $lt: ['$updatedAt', dateBefore7d] }, '$price', 0 ]
                },
                floor30d: {
                    $cond: [ { $lt: ['$updatedAt', dateBefore30d] }, '$price', 0 ]
                }
            }
        },
        {
            $match: {
                chain,
                collectionAddr: address,
            }
        },
        { $group:
            {
                _id: null,
                floor : { $min: "$price" },
                floor24h: { $min: "$floor24h" },
                floor7d: { $min: "$floor7d" },
                floor30d: { $min: "$floor30d" }
            }
        }])
    }

    updatePrice = async (
        chain: String,
        collectionAddr: String,
        price: number
    ) => {
        let filters = [
            {chain: chain},
            {collectionAddr: collectionAddr},
            {price: {$lte: price}}
        ]

        prices.find({ $and: filters }).exec((err, order) => {
            if ( order.length == 0 ) {
                const newPrice = new prices({ 
                    chain: chain,
                    collectionAddr: collectionAddr,
                    price: price
                })

               return newPrice.save()
            }
        })
    }

    getChartInfo = async (
        chain: String,
        address: String,
        date: Date
    ) => {
        return prices.aggregate([
            {
                $match: {
                    $and: [
                        {'chain': chain},
                        {'collectionAddr': address},
                        {'updatedAt': {$gte: date}}
                    ]
                }
            },
            { $group:
                {
                    _id : { day: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } },
                    price: { $min: "$price" },
                }
            }]
        )
    }
}

export default new PricesRepository()