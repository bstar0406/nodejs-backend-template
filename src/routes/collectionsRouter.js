"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collectionsController_1 = require("../controllers/collectionsController");
class CollectionsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.collectionsController = new collectionsController_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.collectionsController.getCollection);
        this.router.route('/').post(this.collectionsController.addCollection);
        this.router.route('/stats').get(this.collectionsController.getCollectionStat);
        this.router.route('/chart').get(this.collectionsController.getCollectionChart);
    }
}
exports.default = new CollectionsRouter().router;
//# sourceMappingURL=collectionsRouter.js.map