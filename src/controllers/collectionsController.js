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
const errorHandler_1 = require("../handlers/errorHandler");
const collections_1 = require("../repositories/collections");
const orders_1 = require("../repositories/orders");
const prices_1 = require("../repositories/prices");
class CollectionsController {
    constructor() {
        /**
        * Get Collection Function
        */
        this.getCollection = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chain, address } = req.body;
            try {
                const collection = yield collections_1.default.getCollectionByAddress(chain, address);
                res.json({ "success": true, "message": null, "data": collection });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get Collection failed.');
            }
        });
        /**
        * Add Collection Function
        */
        this.addCollection = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { address, owner, name, description, symbol, type, websiteLink, facebookLink, twitterLink, instagramLink, telegramLink, mediumLink, discordLink, isVerified, isExplicit, standard, chain } = req.body;
            try {
                const collection = yield collections_1.default.addCollection(address, owner, name, description, symbol, type, websiteLink, facebookLink, twitterLink, instagramLink, telegramLink, mediumLink, discordLink, isVerified, isExplicit, standard, chain);
                res.json({ "success": true, "message": null, "data": collection });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Add Collection failed.');
            }
        });
        /**
        * Get Collections Stats Function
        */
        this.getCollectionStat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chain, address } = req.body;
            const currentDate = new Date().getTime();
            const dateBefore24h = new Date(currentDate - 24 * 60 * 60 * 1000);
            const dateBefore7d = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
            const dateBefore30d = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);
            const dateBefore3m = new Date(currentDate - 90 * 24 * 60 * 60 * 1000);
            const dateBefore6m = new Date(currentDate - 180 * 24 * 60 * 60 * 1000);
            const dateBefore1y = new Date(currentDate - 365 * 24 * 60 * 60 * 1000);
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
                };
                const floor = yield prices_1.default.getFloorPrices(chain, address);
                if (floor[0]) {
                    result['floorPrice'] = floor[0].floor;
                    if (floor[0].floor24h > 0) {
                        result['floorChange24h'] = floor[0].floor24h - floor[0].floor;
                    }
                    else {
                        result['floorChange24h'] = floor[0].floor;
                    }
                    if (floor[0].floor7d > 0) {
                        result['floorChange7d'] = floor[0].floor7d - floor[0].floor;
                    }
                    else {
                        result['floorChange7d'] = floor[0].floor;
                    }
                    if (floor[0].floor30d > 0) {
                        result['floorChange30d'] = floor[0].floor30d - floor[0].floor;
                    }
                    else {
                        result['floorChange30d'] = floor[0].floor;
                    }
                }
                const volume24hInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore24h);
                if (volume24hInfo[0]) {
                    result['volume24h'] = volume24hInfo[0].volume;
                    result['count24h'] = volume24hInfo[0].count;
                    if (volume24hInfo[0].count > 0) {
                        result['average24h'] = Math.floor(volume24hInfo[0].volume / volume24hInfo[0].count);
                    }
                }
                const volume7dInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore7d);
                if (volume7dInfo[0]) {
                    result['volume7d'] = volume7dInfo[0].volume;
                    result['count7d'] = volume7dInfo[0].count;
                    if (volume7dInfo[0].count > 0) {
                        result['average7d'] = Math.floor(volume7dInfo[0].volume / volume7dInfo[0].count);
                    }
                }
                const volume1mInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore30d);
                if (volume1mInfo[0]) {
                    result['volume1m'] = volume1mInfo[0].volume;
                    result['count1m'] = volume1mInfo[0].count;
                    if (volume1mInfo[0].count > 0) {
                        result['average1m'] = Math.floor(volume1mInfo[0].volume / volume1mInfo[0].count);
                    }
                }
                const volume3mInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore3m);
                if (volume3mInfo[0]) {
                    result['volume3m'] = volume3mInfo[0].volume;
                    result['count3m'] = volume3mInfo[0].count;
                    if (volume3mInfo[0].count > 0) {
                        result['average3m'] = Math.floor(volume3mInfo[0].volume / volume3mInfo[0].count);
                    }
                }
                const volume6mInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore6m);
                if (volume6mInfo[0]) {
                    result['volume6m'] = volume6mInfo[0].volume;
                    result['count6m'] = volume6mInfo[0].count;
                    if (volume6mInfo[0].count > 0) {
                        result['average6m'] = Math.floor(volume6mInfo[0].volume / volume6mInfo[0].count);
                    }
                }
                const volume1yInfo = yield orders_1.default.getVolumeInfo(chain, address, dateBefore1y);
                if (volume1yInfo[0]) {
                    result['volume1y'] = volume1yInfo[0].volume;
                    result['count1y'] = volume1yInfo[0].count;
                    if (volume1yInfo[0].count > 0) {
                        result['average1y'] = Math.floor(volume1yInfo[0].volume / volume1yInfo[0].count);
                    }
                }
                const volumeAllInfo = yield orders_1.default.getVolumeInfo(chain, address);
                if (volumeAllInfo[0]) {
                    result['volumeAll'] = volumeAllInfo[0].volume;
                    result['countAll'] = volumeAllInfo[0].count;
                    if (volumeAllInfo[0].count > 0) {
                        result['averageAll'] = Math.floor(volumeAllInfo[0].volume / volumeAllInfo[0].count);
                    }
                }
                res.json({ "success": true, "message": null, "data": result });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get Collection Stats failed.');
            }
        });
        /**
         * Get Chart Data Function
         */
        this.getCollectionChart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chain, address, days } = req.body;
            const currentDate = new Date().getTime();
            const timesPerDay = 24 * 60 * 60 * 1000;
            const dateBefore = new Date(currentDate - days * timesPerDay);
            let result = {};
            try {
                for (var i = dateBefore.getTime(); i <= currentDate; i = i + timesPerDay) {
                    result[new Date(i).toISOString().slice(0, 10)] = {
                        count: 0,
                        volume: 0,
                        average: 0
                    };
                }
                const ordersByDaily = yield orders_1.default.getChartInfo(chain, address, dateBefore);
                for (let order of ordersByDaily) {
                    const date = order._id.day;
                    result[date] = {};
                    result[date].volume = order.volume;
                    result[date].count = order.count;
                    if (order["count"] > 0) {
                        result[date].average = order.volume / order.count;
                    }
                }
                const floorPriceByDaily = yield prices_1.default.getChartInfo(chain, address, dateBefore);
                for (let floorPrice of floorPriceByDaily) {
                    const date = floorPrice._id.day;
                    result[date].floorPrice = floorPrice.price;
                }
                res.json({ "success": true, "message": null, "data": result });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get Collection Chart failed.');
            }
        });
    }
}
exports.default = CollectionsController;
//# sourceMappingURL=collectionsController.js.map