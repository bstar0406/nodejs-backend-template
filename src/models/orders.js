"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ordersSchema = new Schema({
    isOrderAsk: Boolean,
    signer: String,
    collectionAddr: String,
    price: Number,
    tokenId: Number,
    amount: Number,
    strategy: String,
    currency: String,
    nonce: Number,
    startTime: Number,
    endTime: Number,
    minPercentageToAsk: Number,
    signatureHash: String,
    srcChain: String,
    destChain: String,
    updated: Number,
    volume: Number,
    status: {
        type: String,
        enum: ['CANCELLED', 'EXECUTED', 'EXPIRED', 'VALID'],
        default: 'VALID'
    },
}, { timestamps: true });
exports.default = mongoose.model('orders', ordersSchema);
//# sourceMappingURL=orders.js.map