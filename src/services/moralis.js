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
exports.getUserNFTs = exports.hasUserNFT = void 0;
/* import moralis */
const Moralis = require("moralis/node");
const serverUrl = process.env.MORALIS_SERVER;
const appId = process.env.MORALIS_APP_ID;
const moralisSecret = process.env.MORALIS_SECRET;
const hasUserNFT = (chain, signer, collection, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Moralis.start({ serverUrl, appId, moralisSecret });
        if (tokenId == null) {
            const options = { address: collection, chain };
            const nftOwners = yield Moralis.Web3API.token.getNFTOwners(options);
            for (let nftOwner of nftOwners.result) {
                if (nftOwner.owner_of == signer) {
                    return true;
                }
            }
        }
        else if (tokenId >= 0) {
            const options = { address: collection, token_id: tokenId, chain };
            const nftOwners = yield Moralis.Web3API.token.getTokenIdOwners(options);
            for (let nftOwner of nftOwners.result) {
                if (nftOwner.owner_of == signer) {
                    return true;
                }
            }
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.hasUserNFT = hasUserNFT;
const getUserNFTs = (chain, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Moralis.start({ serverUrl, appId, moralisSecret });
        let cursor = null, nfts = [];
        do {
            const options = {
                chain,
                address,
                cursor
            };
            const nft_result = yield Moralis.Web3API.account.getNFTs(options);
            cursor = nft_result.cursor;
            nfts = nfts.concat(nft_result.result);
        } while (cursor !== "");
        return nfts;
    }
    catch (err) {
        console.log(err);
        return [];
    }
});
exports.getUserNFTs = getUserNFTs;
//# sourceMappingURL=moralis.js.map