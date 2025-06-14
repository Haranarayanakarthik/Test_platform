import express  from "express";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/test";

const app = express()

app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  credentials: true,
  METHODS:["GET","POST","DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("server wokin")
})

app.use(userRouter)

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