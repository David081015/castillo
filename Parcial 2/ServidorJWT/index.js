import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import authRouter from './auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
    .use('/auth',authRouter)
    .listen(PORT,()=>{
        "Servidor escuchando en puerto 8084"
    })