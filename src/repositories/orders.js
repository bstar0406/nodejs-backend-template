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
const orders_1 = require("../models/orders");
class OrdersRepository {
    constructor() {
        this.getVolumeInfo = (chain, address, date) => __awaiter(this, void 0, void 0, function* () {
            let filters;
            if (date) {
                filters = [
                    { 'status': 'EXECUTED' },
                    { 'srcChain': chain },
                    { 'collectionAddr': address },
                    { updatedAt: { $gte: date } }
                ];
            }
            else {
                filters = [
                    { 'status': 'EXECUTED' },
                    { 'srcChain': chain },
                    { 'collectionAddr': address },
                ];
            }
            return orders_1.default.aggregate([
                {
                    $match: {
                        $and: filters
                    }
                },
                { $group: {
                        _id: null,
                        count: { $sum: 1 },
                        volume: { $sum: "$volume" },
                    }
                }
            ]);
        });
        this.getChartInfo = (chain, address, date) => __awaiter(this, void 0, void 0, function* () {
            return orders_1.default.aggregate([
                {
                    $match: {
                        $and: [
                            { 'status': 'EXECUTED' },
                            { 'srcChain': chain },
                            { 'collectionAddr': address },
                            { 'updatedAt': { $gte: date } }
                        ]
                    }
                },
                { $group: {
                        _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } } },
                        count: { $sum: 1 },
                        volume: { $sum: "$volume" },
                    }
                }
            ]);
        });
        this.getOrders = (filters, sorting, from, first) => __awaiter(this, void 0, void 0, function* () {
            return orders_1.default.find({ '$and': filters }).skip(from !== null && from !== void 0 ? from : 0).limit(first !== null && first !== void 0 ? first : 20).sort(sorting);
        });
        this.createOrder = (data) => __awaiter(this, void 0, void 0, function* () {
            const order = new orders_1.default(data);
            return order.save();
        });
        this.getUserNonce = (signer) => __awaiter(this, void 0, void 0, function* () {
            return orders_1.default.findOne({ signer })
                .sort('nonce');
        });
        this.updateOrderStatus = (_id, status) => __awaiter(this, void 0, void 0, function* () {
            return orders_1.default.findOneAndUpdate({ _id }, {
                $set: { 'status': status, 'signatureHash': null },
            }, {
                new: true
            });
        });
    }
}
exports.default = new OrdersRepository();
//# sourceMappingURL=orders.js.map