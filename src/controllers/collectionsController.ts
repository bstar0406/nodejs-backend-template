import { Request, Response, NextFunction } from 'express'
import { apiErrorHandler } from '../handlers/errorHandler'

import collections from "../repositories/collections"
import orders from "../repositories/orders"
import prices from "../repositories/prices"

export default class CollectionsController {
  constructor() { }

  /**
  * Get Collection Function
  */
  getCollection = async (req: Request, res: Response, next: NextFunction) => {
    const { chain, address } = req.body

    try {
        const collection = await collections.getCollectionByAddress(chain, address)
        
        res.json({"success": true, "message": null, "data": collection})
    } catch (error) {
        apiErrorHandler(error, req, res, 'Get Collection failed.')
    }
  }

  /**
  * Add Collection Function
  */
  addCollection = async (req: Request, res: Response, next: NextFunction) => {
    const {
        address,
        owner,
        name,
        description,
        symbol,
        type,
        websiteLink,
        facebookLink,
        twitterLink,
        instagramLink,
        telegramLink,
        mediumLink,
        discordLink,
        isVerified,
        isExplicit,
        standard,
        chain
    } = req.body
    
    try {
        const collection = await collections.addCollection(
            address,
            owner,
            name,
            description,
            symbol,
            type,
            websiteLink,
            facebookLink,
            twitterLink,
            instagramLink,
            telegramLink,
            mediumLink,
            discordLink,
            isVerified,
            isExplicit,
            standard,
            chain
        )

        res.json({"success": true, "message": null, "data": collection})
    } catch (error) {
        apiErrorHandler(error, req, res, 'Add Collection failed.')
    }
  }

  /**
  * Get Collections Stats Function
  */
  getCollectionStat = async (req: Request, res: Response, next: NextFunction) => {
    const { chain, address } = req.body
    const currentDate = new Date().getTime()
    const dateBefore24h = new Date(currentDate - 24 * 60 * 60 * 1000)
    const dateBefore7d = new Date(currentDate - 7 * 24 * 60 * 60 * 1000)
    const dateBefore30d = new Date(currentDate - 30 * 24 * 60 * 60 * 1000)
    const dateBefore3m = new Date(currentDate - 90 * 24 * 60 * 60 * 1000)
    const dateBefore6m = new Date(currentDate - 180 * 24 * 60 * 60 * 1000)
    const dateBefore1y = new Date(currentDate - 365 * 24 * 60 * 60 * 1000)

    try {
        let result = {
            'chain': chain,
            'address': address,
            'floorPrice': 0,
            'floorChange24h': 0,
            'floorChange7d': 0,
            'floorChange30d': 0,
            'volume7d': 0,
            'average7d': 0,
            'count7d': 0,
            'volume1m': 0,
            'average1m': 0,
            'count1m': 0,
            'volume3m': 0,
            'average3m': 0,
            'count3m': 0,
            'volume6m': 0,
            'average6m': 0,
            'count6m': 0,
            'volume1y': 0,
            'average1y': 0,
            'count1y': 0,
            'volumeAll': 0,
            'averageAll': 0,
            'countAll': 0
        }

        const floor = await prices.getFloorPrices(chain, address)
        if ( floor[0] ) {
            result['floorPrice'] = floor[0].floor
            if ( floor[0].floor24h > 0 ) {
                result['floorChange24h'] = floor[0].floor24h - floor[0].floor
            } else {
                result['floorChange24h'] = floor[0].floor
            }
            if ( floor[0].floor7d > 0 ) {
                result['floorChange7d'] = floor[0].floor7d - floor[0].floor
            } else {
                result['floorChange7d'] = floor[0].floor
            }
            if ( floor[0].floor30d > 0 ) {
                result['floorChange30d'] = floor[0].floor30d - floor[0].floor
            } else {
                result['floorChange30d'] = floor[0].floor
            }
        }

        const volume24hInfo = await orders.getVolumeInfo(chain, address, dateBefore24h)
        if ( volume24hInfo[0] ) {
            result['volume24h'] = volume24hInfo[0].volume
            result['count24h'] = volume24hInfo[0].count
            if ( volume24hInfo[0].count > 0 ) {
                result['average24h'] = Math.floor(volume24hInfo[0].volume / volume24hInfo[0].count)
            }
        }

        const volume7dInfo = await orders.getVolumeInfo(chain, address, dateBefore7d)
        if ( volume7dInfo[0] ) {
            result['volume7d'] = volume7dInfo[0].volume
            result['count7d'] = volume7dInfo[0].count
            if ( volume7dInfo[0].count > 0 ) {
                result['average7d'] = Math.floor(volume7dInfo[0].volume / volume7dInfo[0].count)
            }
        }

        const volume1mInfo = await orders.getVolumeInfo(chain, address, dateBefore30d)
        if ( volume1mInfo[0] ) {
            result['volume1m'] = volume1mInfo[0].volume
            result['count1m'] = volume1mInfo[0].count
            if ( volume1mInfo[0].count > 0 ) {
                result['average1m'] = Math.floor(volume1mInfo[0].volume / volume1mInfo[0].count)
            }
        }

        const volume3mInfo = await orders.getVolumeInfo(chain, address, dateBefore3m)
        if ( volume3mInfo[0] ) {
            result['volume3m'] = volume3mInfo[0].volume
            result['count3m'] = volume3mInfo[0].count
            if ( volume3mInfo[0].count > 0 ) {
                result['average3m'] = Math.floor(volume3mInfo[0].volume / volume3mInfo[0].count)
            }
        }

        const volume6mInfo = await orders.getVolumeInfo(chain, address, dateBefore6m)
        if ( volume6mInfo[0] ) {
            result['volume6m'] = volume6mInfo[0].volume
            result['count6m'] = volume6mInfo[0].count
            if ( volume6mInfo[0].count > 0 ) {
                result['average6m'] = Math.floor(volume6mInfo[0].volume / volume6mInfo[0].count)
            }
        }

        const volume1yInfo = await orders.getVolumeInfo(chain, address, dateBefore1y)
        if ( volume1yInfo[0] ) {
            result['volume1y'] = volume1yInfo[0].volume
            result['count1y'] = volume1yInfo[0].count
            if ( volume1yInfo[0].count > 0 ) {
                result['average1y'] = Math.floor(volume1yInfo[0].volume / volume1yInfo[0].count)
            }
        }
        
        const volumeAllInfo = await orders.getVolumeInfo(chain, address)
        if ( volumeAllInfo[0] ) {
            result['volumeAll'] = volumeAllInfo[0].volume
            result['countAll'] = volumeAllInfo[0].count
            if ( volumeAllInfo[0].count > 0 ) {
                result['averageAll'] = Math.floor(volumeAllInfo[0].volume / volumeAllInfo[0].count)
            }
        }

        res.json({"success": true, "message": null, "data": result})
    } catch (error) {
        apiErrorHandler(error, req, res, 'Get Collection Stats failed.')
    }
  }

  /**
   * Get Chart Data Function
   */

  getCollectionChart = async (req: Request, res: Response, next: NextFunction) => {
    const { chain, address, days } = req.body
    const currentDate = new Date().getTime()
    const timesPerDay = 24 * 60 * 60 * 1000
    const dateBefore = new Date(currentDate - days * timesPerDay)
    let result = {}

    try {
        for ( var i = dateBefore.getTime(); i <= currentDate; i = i + timesPerDay ) {
            result[new Date(i).toISOString().slice(0, 10)] = {
                count: 0,
                volume: 0,
                average: 0
            }
        }

        const ordersByDaily = await orders.getChartInfo(chain, address, dateBefore)
        
        for ( let order of ordersByDaily ) {
            const date = order._id.day
            result[date] = {}
            result[date].volume = order.volume
            result[date].count = order.count
            if ( order["count"] > 0 ) {
                result[date].average = order.volume / order.count
            }
        }

        const floorPriceByDaily = await prices.getChartInfo(chain, address, dateBefore)
        
        for ( let floorPrice of floorPriceByDaily ) {
            const date = floorPrice._id.day
            result[date].floorPrice = floorPrice.price
        }

        res.json({"success": true, "message": null, "data": result})
    } catch (error) {
        apiErrorHandler(error, req, res, 'Get Collection Chart failed.')
    }
  }
}