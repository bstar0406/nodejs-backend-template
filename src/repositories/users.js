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
const users_1 = require("../models/users");
class UsersRepository {
    constructor() {
        this.getProfile = (address) => {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user && user[0])
                    return user[0];
                else
                    return {
                        address: address,
                        username: '',
                        bio: '',
                        twitter: '',
                        website: '',
                        photo: '',
                    };
            });
        };
        this.updateProfile = (address, username, bio, twitter, website, photo) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    const newUser = new users_1.default({
                        address,
                        username,
                        bio,
                        twitter,
                        website,
                        photo,
                    });
                    newUser.save();
                    return newUser;
                }
                else {
                    if (user && user[0]) {
                        user[0].username = username;
                        user[0].bio = bio;
                        user[0].twitter = twitter;
                        user[0].website = website;
                        if (photo)
                            user[0].photo = photo;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.addBanner = (address, banner) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const banners = user[0].banners;
                        if (banner)
                            banners.push(banner);
                        user[0].banners = banners;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.removeBanner = (address, banner) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const banners = user[0].banners;
                        if (banner) {
                            var filename = banner.substring(banner.lastIndexOf('/') + 1);
                            filename = filename.substring(filename.lastIndexOf('\\') + 1);
                            const idx = banners.indexOf('uploads\\' + filename);
                            banners.splice(idx, 1);
                        }
                        user[0].banners = banners;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.addWatchlist = (address, watchlist) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const watchlists = user[0].watchlists;
                        watchlists.push(watchlist);
                        user[0].watchlists = watchlists;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.removeWatchlist = (address, watchlist) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const watchlists = user[0].watchlists;
                        const idx = watchlists.indexOf(watchlist);
                        watchlists.splice(idx, 1);
                        user[0].watchlists = watchlists;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.addHiddenNFT = (address, hiddenNFT) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const hiddenNFTs = user[0].hiddenNFTs;
                        hiddenNFTs.push(hiddenNFT);
                        user[0].hiddenNFTs = hiddenNFTs;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.removeHiddenNFT = (address, hiddenNFT) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const hiddenNFTs = user[0].hiddenNFTs;
                        const idx = hiddenNFTs.indexOf(hiddenNFT);
                        hiddenNFTs.splice(idx, 1);
                        user[0].hiddenNFTs = hiddenNFTs;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.addFollowing = (address, following) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const followings = user[0].followings;
                        followings.push(following);
                        user[0].followings = followings;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
        this.removeFollowing = (address, following) => __awaiter(this, void 0, void 0, function* () {
            const filters = [{ address }];
            users_1.default.find({ $and: filters }).exec((err, user) => {
                if (user.length === 0) {
                    return [];
                }
                else {
                    if (user && user[0]) {
                        const followings = user[0].followings;
                        const idx = followings.indexOf(following);
                        followings.splice(idx, 1);
                        user[0].followings = followings;
                        user[0].save();
                        return user[0];
                    }
                }
            });
        });
    }
}
exports.default = new UsersRepository();
//# sourceMappingURL=users.js.map