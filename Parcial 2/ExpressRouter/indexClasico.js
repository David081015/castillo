const express = require('express');
const app = express();

app.get('/tec', function(req,res){
    res.json({respuesta: "Peticion get a ruta tec"})
});

app.post('/tec', function(req,res){
    res.json({respuesta: "Peticion post a ruta tec"})
});

app.put('/tec', function(req,res){
    res.json({respuesta: "Peticion put a ruta tec"})
});

app.delete('/tec', function(req,res){
    res.json({respuesta: "Peticion delete a ruta tec"})
});

app.listen(8084, function(err){
    if(err)console.log(err);
    console.log("Server escuchando puerto 8084")
})