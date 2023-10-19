const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

let app = express();
app.use(express.json());

app.post('/login',function(req,res,next){
    var token = jsonwebtoken.sign(req.body,'clavesecreta');
    console.log(token);
    res.json()
})