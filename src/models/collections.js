"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionsSchema = new Schema({
    address: String,
    owner: String,
    name: String,
    description: String,
    symbol: String,
    type: String,
    websiteLink: String,
    facebookLink: String,
    twitterLink: String,
    instagramLink: String,
    telegramLink: String,
    mediumLink: String,
    discordLink: String,
    isVerified: Boolean,
    isExplicit: Boolean,
    standard: {
        type: String,
        default: 'erc'
    },
    chain: String
});
exports.default = mongoose.model('collections', collectionsSchema);
//# sourceMappingURL=collections.js.map