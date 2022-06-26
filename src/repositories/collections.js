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
const collections_1 = require("../models/collections");
class CollectionsRepository {
    constructor() {
        this.getCollectionByAddress = (chain, address) => __awaiter(this, void 0, void 0, function* () {
            return collections_1.default.findOne({ chain, address })
                .sort('nonce');
        });
        this.addCollection = (address, owner, name, description, symbol, type, websiteLink, facebookLink, twitterLink, instagramLink, telegramLink, mediumLink, discordLink, isVerified, isExplicit, standard, chain) => __awaiter(this, void 0, void 0, function* () {
            const collection = new collections_1.default({
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
            });
            return collection.save();
        });
    }
}
exports.default = new CollectionsRepository();
//# sourceMappingURL=collections.js.map