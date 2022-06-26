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
const orders_1 = require("../repositories/orders");
const prices_1 = require("../repositories/prices");
class OrdersController {
    constructor() {
        /**
         * Get Order Function
         * @param isOrderAsk: Specifies whether the order is ask or bid, true/false
         * @param collection: Collection contract address. Must be a valid Ethereum address.
         * @param tokenId: Id of the specific token
         * @param signer: Signer address. Must be a valid Ethereum address.
         * @param strategy: Strategy contract address.
         * @param currency: Address of the payment token.
         * @param price: Price range for offers to filter by
         * {
         *    "min": "4100",
         *    "max": "8000"
         * }
         * @param startTime: Start timestamp. This accepts the string representation of the timestamp in seconds.
         * @param endTime: End timestamp. This accepts the string representation of the timestamp in seconds.
         * @param status: Order statuses to filter by. This can be a group of multiple statuses, which will be applied OR. CANCELLED, EXECUTED, EXPIRED, VALID
         * @param pagination: Pagination filter. When specified, it will return orders starting from the order with hash of cursor, with first amount. cursor represents the order hash. Default to 20, max to 50.
         * {
         *    "first": 10,
         *    "from": 12
         * }
         * @param sort: Sort by option. EXPIRING_SOON, NEWEST, PRICE_ASC, PRICE_DESC
         * @param chain: Chain of the collection
         */
        this.getOrders = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { isOrderAsk, collection, tokenId, signer, strategy, currency, min, max, startTime, endTime, status, first, from, sort, chain } = req.body;
            const filters = new Array;
            if (isOrderAsk) {
                filters.push({ isOrderAsk: isOrderAsk });
            }
            if (collection) {
                filters.push({ collectionAddr: collection });
            }
            if (tokenId) {
                filters.push({ tokenId: tokenId });
            }
            if (signer) {
                filters.push({ signer: signer });
            }
            if (strategy) {
                filters.push({ strategy: strategy });
            }
            if (currency) {
                filters.push({ currency: currency });
            }
            if (min > 0) {
                filters.push({ price: { $gte: min } });
            }
            if (max > 0) {
                filters.push({ price: { $lte: max } });
            }
            if (startTime > 0) {
                filters.push({ startTime: { $lte: startTime } });
            }
            if (endTime > 0) {
                filters.push({ endTime: { $gte: endTime } });
            }
            if ((status === null || status === void 0 ? void 0 : status.length) > 0) {
                filters.push({ status: { $in: status } });
            }
            if (chain) {
                filters.push({ srcChain: chain });
            }
            let sorting = new Object;
            if (sort == 'EXPIRING_SOON') {
                sorting = { endTime: 1 };
            }
            else if (sort == 'NEWEST') {
                sorting = { startTime: 1 };
            }
            else if (sort == 'PRICE_ASC') {
                sorting = { price: 1 };
            }
            else if (sort == 'PRICE_DESC') {
                sorting = { price: -1 };
            }
            else {
                sorting = { _id: 1 };
            }
            if ((status === null || status === void 0 ? void 0 : status.length) == undefined) {
                return res.status(400).json({
                    "success": false,
                    "name": "Request Error",
                    "message": 'Each value in status must be one of the following values: CANCELLED, EXECUTED, EXPIRED, VALID'
                });
            }
            try {
                const filteredOrders = yield orders_1.default.getOrders(filters, sorting, from, first);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": filteredOrders,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get Orders failed.');
            }
        });
        this.makeOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { isOrderAsk, signer, collection, price, tokenId, amount, strategy, currency, nonce, startTime, endTime, minPercentageToAsk, signature, srcChain, destChain } = req.body;
            try {
                const order = yield orders_1.default.createOrder({
                    isOrderAsk,
                    signer,
                    collectionAddr: collection,
                    price,
                    tokenId,
                    amount,
                    strategy,
                    currency,
                    nonce,
                    startTime,
                    endTime,
                    minPercentageToAsk,
                    signatureHash: signature,
                    srcChain,
                    destChain,
                    volume: price * amount
                });
                return res.json({
                    "success": true,
                    "message": null,
                    "data": order,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get Orders failed.');
            }
        });
        this.getNonce = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { signer } = req.body;
            try {
                const order = yield orders_1.default.getUserNonce(signer);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": order ? (order.nonce + 1) : 1
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get User Nonce failed.');
            }
        });
        this.changeOrderStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { hash, status } = req.body;
            try {
                const updatedOrder = yield orders_1.default.updateOrderStatus(hash, status);
                if (status == 'EXECUTED') {
                    yield prices_1.default.updatePrice(updatedOrder.srcChain, updatedOrder.collectionAddr, updatedOrder.price);
                }
                return res.json({
                    "success": true,
                    "message": null,
                    "data": updatedOrder
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get User Nonce failed.');
            }
        });
    }
}
exports.default = OrdersController;
//# sourceMappingURL=ordersController.js.map