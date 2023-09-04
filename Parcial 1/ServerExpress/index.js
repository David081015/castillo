const express = require('express');
const app = express();

app.use(express.json());

app.get("/alumnos/:carrera",(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor express contestando a peticion GET");
    
});
app.post("/alumnos",(req,res)=>{
    res.send("Servidor express contestando a peticion POST");
});
app.listen(8080,(req,res)=>{
    console.log("Servidor express escuchando");
});