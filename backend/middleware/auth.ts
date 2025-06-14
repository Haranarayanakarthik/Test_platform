import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import { User } from "../models/user";



export const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const secret = process.env.JWT_SECRET as string
        const {token} = req.cookies

        if(!token){
            return next(new Error("Token unavailable"))
        }

        const decodedToken = jwt.verify(token,secret) as JwtPayload

        const user = await User.findById(decodedToken._id).select("-password")
        if(!user){
            throw new Error("User unauthorized")
        }

        req.body.user = user
        next()

    } catch (error) {
        console.log("token verification failed.",error)
    }
}