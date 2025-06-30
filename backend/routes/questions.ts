import { Router } from "express";
import { pythonQuestions } from "../controllers/questions";

const r = Router();

r.get("/generate",pythonQuestions)

export default r