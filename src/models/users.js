"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    address: {
        type: String,
    },
    username: {
        type: String
    },
    bio: {
        type: String
    },
    twitter: {
        type: String
    },
    website: {
        type: String
    },
    photo: {
        type: String
    },
    banners: [{
            type: String
        }],
    watchlists: [{
            type: String
        }],
    hiddenNFTs: [{
            type: String
        }],
    followings: [{
            type: String
        }],
}, { timestamps: true });
exports.default = mongoose.model('users', usersSchema);
//# sourceMappingURL=users.js.map