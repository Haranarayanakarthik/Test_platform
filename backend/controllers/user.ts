import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import 'dotenv/config'

const cookieOptions = {
    httpOnly: true ,
    secure: true,
    sameSite: "none" as "none", 
    maxAge:  60 * 60 * 1000
}

const JWT_SECRET = process.env.JWT_SECRET as string

export const signup = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res
    .status(200)
    .json({ message: "Login successful." })
    .cookie("token",token,cookieOptions)


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);

  res.status(200).json({ message: "Logged out successfully" });
};