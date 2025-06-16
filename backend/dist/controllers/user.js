"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
require("dotenv/config");
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000
};
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required." });
        }
        const existingUser = await user_1.User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_1.User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required." });
        }
        const user = await user_1.User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res
            .status(200).cookie("token", token, cookieOptions)
            .json({ message: "Login successful." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
