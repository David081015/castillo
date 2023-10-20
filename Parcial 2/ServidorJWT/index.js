const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

let app = express();
app.use(express.json());

app.post('/login',function(req,res,next){
    var token = jsonwebtoken.sign(req.body,'claveSecreta');
    console.log(token);
    res.json({token});
});

app.get('/sistemas',verificarToken,function(req,res,next){
    res.json({mensaje:"Acceso concedido a ruta sistema"})
});

app.listen(8084,function(){
    console.log("Servidor express escuchando en puerto 8084");
});

function verificarToken(req,res,next){
    console.log(req.headers.authorization);
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    jsonwebtoken.verify(token,'claveSecreta',function(err,decoded){
        if(err){
            res.json({Error:"Acceso no concedido a ruta sistemas"});
        } else{
            next();
        }
    });
}