import express  from "express";
import cors from "cors"
import mongoose from "mongoose";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";
import questionsRouter from "./routes/questions"

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/TestDb";

const app = express()



const corsOptions = {
  origin: "http://*",
  credentials: true,
  METHODS:["GET","POST","DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("server wokin")
})

app.use(userRouter)
app.use(questionsRouter)

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

startServer();