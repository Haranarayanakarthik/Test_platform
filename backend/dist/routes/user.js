"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const r = (0, express_1.Router)();
r.post("/signup", user_1.signup);
r.post("/login", user_1.login);
exports.default = r;
