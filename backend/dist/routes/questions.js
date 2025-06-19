"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questions_1 = require("../controllers/questions");
const r = (0, express_1.Router)();
r.get("/generate", questions_1.pythonQuestions);
exports.default = r;
