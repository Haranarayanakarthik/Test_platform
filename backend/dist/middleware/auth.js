"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const user_1 = require("../models/user");
const verifyToken = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        const { token } = req.cookies;
        if (!token) {
            return next(new Error("Token unavailable"));
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const user = await user_1.User.findById(decodedToken._id).select("-password");
        if (!user) {
            throw new Error("User unauthorized");
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log("token verification failed.", error);
    }
};
exports.verifyToken = verifyToken;
