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
const users_1 = require("../repositories/users");
const moralis_1 = require("../services/moralis");
class UsersController {
    constructor() {
        /**
         * Get NFTs Function
         * @param req
         * @param res
         * @param next
         */
        this.getNFTs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { address } = req.body;
            const chains = ['eth', 'bsc', 'matic', 'avalanche', 'fantom', 'optimism', 'arbitrum'];
            try {
                let nfts = [];
                for (var i in chains) {
                    const nft_list = yield (0, moralis_1.getUserNFTs)(chains[i], address);
                    nft_list.map((obj) => {
                        obj['chain'] = chains[i];
                        return obj;
                    });
                    nfts = nfts.concat(nft_list);
                }
                res.json({ "success": true, "message": null, "data": nfts });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Get NFTs failed.');
            }
        });
        this.getProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { address } = req.query;
            const user = yield users_1.default.getProfile(address);
            console.log(user);
            return res.json({
                "success": true,
                "message": null,
                "data": user,
            });
        });
        this.updateProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, username, bio, twitter, website } = req.body;
                var photo = '';
                if (req.files && req.files[0]) {
                    photo = req.files[0].path;
                }
                const user = users_1.default.updateProfile(address, username, bio, twitter, website, photo);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Update Profile failed.');
            }
        });
        this.addBanner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address } = req.body;
                var banner = '';
                if (req.files && req.files[0]) {
                    banner = req.files[0].path;
                }
                const user = users_1.default.addBanner(address, banner);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Add Banner failed.');
            }
        });
        this.removeBanner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, banner } = req.body;
                const user = users_1.default.removeBanner(address, banner);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Remove Banner failed.');
            }
        });
        this.addWatchlist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, watchlist } = req.body;
                const user = users_1.default.addWatchlist(address, watchlist);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Add Watchlist failed.');
            }
        });
        this.removeWatchlist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, watchlist } = req.body;
                const user = users_1.default.removeWatchlist(address, watchlist);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Remove Watchlist failed.');
            }
        });
        this.addHiddenNFT = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, hiddenNFT } = req.body;
                const user = users_1.default.addHiddenNFT(address, hiddenNFT);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Add Hidden NFT failed.');
            }
        });
        this.removeHiddenNFT = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, hiddenNFT } = req.body;
                const user = users_1.default.removeHiddenNFT(address, hiddenNFT);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Remove Hidden NFT failed.');
            }
        });
        this.addFollowing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, following } = req.body;
                const user = users_1.default.addFollowing(address, following);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Add Following failed.');
            }
        });
        this.removeFollowing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, following } = req.body;
                const user = users_1.default.removeFollowing(address, following);
                return res.json({
                    "success": true,
                    "message": null,
                    "data": user,
                });
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Remove Following failed.');
            }
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=usersController.js.map