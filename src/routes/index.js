"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordersRouter_1 = require("./ordersRouter");
const collectionsRouter_1 = require("./collectionsRouter");
const usersRouter_1 = require("./usersRouter");
class Routes {
    constructor(app) {
        // orders reoutes
        app.use('/api/v1/orders', ordersRouter_1.default);
        // collections routes
        app.use('/api/v1/collections', collectionsRouter_1.default);
        // users routes
        app.use('/api/v1/users', usersRouter_1.default);
    }
}
exports.default = Routes;
//# sourceMappingURL=index.js.map