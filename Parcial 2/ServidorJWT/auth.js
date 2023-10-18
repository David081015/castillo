import { Router } from "express"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const authRouter = Router()
const SECRET_KEY = process.env.SECRET_KEY

authRouter
    .use('/priv',verifyToken)
    .get('/',(req,res)=>{
        res.json({message:'Ruta desprotegida'})
    })
    .post('/login',(req,res)=>{
        try{
            const {user,password} = req.body
        console.log('User ${user} esta intentando ingresar')

        if(user == 'admin' && password == "1980"){
            return res.status(201).json({
                token: jwt.sign({user:'admin', SECRET_KEY})
            })
        }
        }     
        catch(err){
            return res.json({error:err})
        }
    })
    .get('/priv/rutaprivada',(req,res)=>{
        res.status(200).json({message:"Ruta protegida"})
    })

async function verifyToken(req,res,next){
    if(!req.headers.authorization){
        res.status(401).send('Acceso no autorizado')
    }
    //Bearer
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    //Token
    console.log(token)
    try{
        jwt.verify(token,SECRET_KEY,(err)=>{
            if(err) return res.status(401)({error: "Token invalido"})
            next()
        })
    }
    catch(err){
        res.json({error:err})
    }
}

export default authRouter