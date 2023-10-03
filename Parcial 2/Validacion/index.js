const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

app.post("/alumno",[check('edad').isNumeric()
,check('correo').isEmail()]
,(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        console.log(req.body);
        res.json({mensaje:"Respuesta a peticion post"});
    } else{
        res.json(result);
    }
});

app.listen(8084,()=>{
    console.log("Servidor express escuchando 8084");
});