"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prices_1 = require("../models/prices");
class PricesRepository {
    constructor() {
        this.getFloorPrices = (chain, address) => __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date().getTime();
            const dateBefore24h = new Date(currentDate - 24 * 60 * 60 * 1000);
            const dateBefore7d = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
            const dateBefore30d = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);
            return prices_1.default.aggregate([{
                    $addFields: {
                        floor24h: {
                            $cond: [{ $lt: ['$updatedAt', dateBefore24h] }, '$price', 0]
                        },
                        floor7d: {
                            $cond: [{ $lt: ['$updatedAt', dateBefore7d] }, '$price', 0]
                        },
                        floor30d: {
                            $cond: [{ $lt: ['$updatedAt', dateBefore30d] }, '$price', 0]
                        }
                    }
                },
                {
                    $match: {
                        chain,
                        collectionAddr: address,
                    }
                },
                { $group: {
                        _id: null,
                        floor: { $min: "$price" },
                        floor24h: { $min: "$floor24h" },
                        floor7d: { $min: "$floor7d" },
                        floor30d: { $min: "$floor30d" }
                    }
                }]);
        });
        this.updatePrice = (chain, collectionAddr, price) => __awaiter(this, void 0, void 0, function* () {
            let filters = [
                { chain: chain },
                { collectionAddr: collectionAddr },
                { price: { $lte: price } }
            ];
            prices_1.default.find({ $and: filters }).exec((err, order) => {
                if (order.length == 0) {
                    const newPrice = new prices_1.default({
                        chain: chain,
                        collectionAddr: collectionAddr,
                        price: price
                    });
                    return newPrice.save();
                }
            });
        });
        this.getChartInfo = (chain, address, date) => __awaiter(this, void 0, void 0, function* () {
            return prices_1.default.aggregate([
                {
                    $match: {
                        $and: [
                            { 'chain': chain },
                            { 'collectionAddr': address },
                            { 'updatedAt': { $gte: date } }
                        ]
                    }
                },
                { $group: {
                        _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } },
                        price: { $min: "$price" },
                    }
                }
            ]);
        });
    }
}
exports.default = new PricesRepository();
//# sourceMappingURL=prices.js.map