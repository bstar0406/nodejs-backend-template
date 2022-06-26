"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const rateLimit_1 = require("./middlewares/rateLimit");
const errorHandler_1 = require("./handlers/errorHandler");
const routes_1 = require("./routes");
const events_1 = require("./services/events");
// app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
class Server {
    constructor(app) {
        this.config(app);
        this.connect();
        new routes_1.default(app);
    }
    connect() {
        mongoose.connect(process.env.DB_CONFIG)
            .then(() => console.log('Connected to Database'))
            .catch(err => {
            throw new Error(err);
        });
        mongoose.set('debug', true);
    }
    config(app) {
        app.use(morgan('dev'));
        app.use((0, express_1.urlencoded)({ extended: true }));
        app.use((0, express_1.json)());
        app.use(helmet());
        app.use(cors());
        app.use((0, rateLimit_1.default)()); //  apply to all requests
        app.use(errorHandler_1.unCoughtErrorHandler);
        app.use(multer({ dest: './uploads/' }).any());
        (0, events_1.installBSCTestEvents)();
        (0, events_1.installRopstenEvents)();
    }
}
exports.default = Server;
process.on('beforeExit', function (err) {
    console.error(err);
});
//# sourceMappingURL=index.js.map