const validation = require("./middleware/joiValidation")
const {registroSchema} = require("./schemas/registro")
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post("/alumnos",validation(registroSchema),(req,res)=>{
    const{Nombre,Apellido,NumControl,Correo} = req.body;
    res.send(`Nombre: ${Nombre}, Apellido: ${Apellido}, NumControl: ${NumControl}, Correo: ${Correo}`);
});

app.listen(8084,()=>{
    console.log("Servidor express escuchando en el puerto 8084");
})