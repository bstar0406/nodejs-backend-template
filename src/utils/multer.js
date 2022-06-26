"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({
    storage,
    fileFilter
});
exports.default = upload;
//# sourceMappingURL=multer.js.map