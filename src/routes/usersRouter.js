"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class CollectionsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.usersController = new usersController_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/nfts').get(this.usersController.getNFTs);
        this.router.route('/profile').get(this.usersController.getProfile);
        this.router.route('/profile').post(this.usersController.updateProfile);
        this.router.route('/add_banner').post(this.usersController.addBanner);
        this.router.route('/remove_banner').post(this.usersController.removeBanner);
        this.router.route('/add_watchlist').post(this.usersController.addWatchlist);
        this.router.route('/remove_watchlist').post(this.usersController.removeWatchlist);
        this.router.route('/add_hidden_nft').post(this.usersController.addHiddenNFT);
        this.router.route('/remove_hidden_nft').post(this.usersController.removeHiddenNFT);
        this.router.route('/add_following').post(this.usersController.addFollowing);
        this.router.route('/remove_following').post(this.usersController.removeFollowing);
    }
}
exports.default = new CollectionsRouter().router;
//# sourceMappingURL=usersRouter.js.map