"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordersController_1 = require("../controllers/ordersController");
class OrdersRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.ordersController = new ordersController_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.ordersController.getOrders);
        this.router.route('/').post(this.ordersController.makeOrder);
        this.router.route('/nonce').post(this.ordersController.getNonce);
        this.router.route('/changeOrderStatus').post(this.ordersController.changeOrderStatus);
    }
}
exports.default = new OrdersRouter().router;
//# sourceMappingURL=ordersRouter.js.map