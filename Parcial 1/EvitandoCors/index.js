const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json())

app.use(cors())

app.get("/alumnos/:carrera",(req,resp)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    resp.json({respuesta:"Servidor Express contestando a peticion GET"});
});

app.get("/alumnos",(req,resp)=>{
    resp.send("Servidor Express contestando a peticion POST");
});

app.use((req, res, next) => {
    res.status(404).send("Página no encontrada");
  });
  
app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});