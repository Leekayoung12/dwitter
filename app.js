import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import dotenv from 'dotenv'
import { config } from './config.js'
dotenv.config()
import cors from 'cors'
import { initSocket } from "./connection/socket.js"
import { connectDB } from './db/database.js'


console.log(process.env.JWT_SECRET)
const app = express()


app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// 라우터
app.use('/Tweets',tweetsRouter)
app.use('/auth',authRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
});

// db.getConnection().then(connection => console.log(connection))
connectDB().then((db) => {
    const server = app.listen(config.host.port)
    initSocket(server)
}).catch(console.error)
