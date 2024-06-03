import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config({
    path:"/env"
})


connectDB();







/*
const app = express();
//console.log(app);


;( async ()=>{

try {

    await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("error in connecting to database")
        throw error;
    })

    app.listen(process.env.PORT,()=>{
        console.log(`app is listening on ${process.env.PORT}`)
    })
} catch (error) {
    console.log("error",error)
    throw error;
}




})
();
*/
