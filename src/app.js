import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//configure cors in our app
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// if you want data in json and sets limit doc of express
app.use(express.json({ limit: "16kb" }));

//crud op in express
app.use(cookieParser());

// to get data from url we use urlencoded
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"))



//routes

import userRouter from './routes/user.routes.js'

//routes declaration /

app.use("/api/v1/users",userRouter)
export default app;
