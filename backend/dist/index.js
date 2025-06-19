"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const questions_1 = __importDefault(require("./routes/questions"));
const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/TestDb";
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://*",
    credentials: true,
    METHODS: ["GET", "POST", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("server wokin");
});
app.use(user_1.default);
app.use(questions_1.default);
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`listening on Port ${PORT}`);
        });
    }
    catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};
startServer();
