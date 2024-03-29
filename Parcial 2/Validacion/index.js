const express = require('express');
const { check, validationResult, checkSchema } = require('express-validator');
const app = express();
app.use(express.json());

const validaUsuario = ()=>{
    return [check('nombre').isLength({min:3, max:14})
        ,check('apellido').isLength({min:10, max:14})
        ,check('edad').isNumeric().withMessage("La edad debe ser numerica")
        ,check('correo').isEmail().withMessage("El correo no tiene formato valido")]
} 

app.post("/alumno",validaUsuario(),(req,res)=>{
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