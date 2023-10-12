const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({respuesta:"peticion get a ruta tec"});
})
.post('/',function(req,res){
    res.status(200).json({respuesta:"peticion post a ruta tec"});
})
.put('/',function(req,res){
    res.status(200).json({respuesta:"peticion put a ruta tec"});
})
.delete('/',function(req,res){
    res.status(200).json({respuesta:"peticion delete a ruta tec"});
})
module.exports.router=router;