const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const opciones = {
    key: fs.readFileSync(path.join(__dirname,"SSL/key.pem")),
    cert: fs.readFileSync(path.join(__dirname,"SSL/cert.pem"))
}
const app = express();

app.get('/ssl', function(req,res){
    res.json({respuesta: "Peticion get segura"})
});

/*
app.listen(8084, function(){
    console.log("Server Express seguro puerto 8084")
})
*/

https.createServer(opciones,app).listen(8083,function(){
    console.log("Servidor Express seguro en puerto 8083")
})
