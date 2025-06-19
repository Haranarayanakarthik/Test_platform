import { Request, response, Response } from "express";
import 'dotenv/config'
import axios from "axios";

const API_KEY=process.env.QUIZ_API_KEY as string

export const pythonQuestions = async(req:Request,res:Response)=>{
    try {
        const resp = await axios.get(`https://quizapi.io/api/v1/questions`,{
            headers:{
                "X-Api-Key":API_KEY
            },
            data:{
                category:"Code",
                difficulty:"easy",
                limit:30,
                tags:"Python"
            }
        })

        console.log(resp.data)
        res.json(resp.data)
    } catch (error) {
        console.log(error)
    }
}