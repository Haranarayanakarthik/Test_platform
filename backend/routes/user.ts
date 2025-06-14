import { Router } from "express";
import { login, signup } from "../controllers/user";

const r = Router()

r.post("/signup",signup)
r.post("/login",login)

export default r