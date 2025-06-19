"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pythonQuestions = void 0;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.QUIZ_API_KEY;
const pythonQuestions = async (req, res) => {
    try {
        const resp = await axios_1.default.get(`https://quizapi.io/api/v1/questions`, {
            headers: {
                "X-Api-Key": API_KEY
            },
            data: {
                category: "Code",
                difficulty: "easy",
                limit: 30,
                tags: "Python"
            }
        });
        console.log(resp.data);
        res.json(resp.data);
    }
    catch (error) {
        console.log(error);
    }
};
exports.pythonQuestions = pythonQuestions;
