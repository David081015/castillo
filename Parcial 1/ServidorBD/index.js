const express = require('express');
const app = express();
var cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var mysql = require('mysql');

app.use(express.json())
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.get("/alumnos/:carrera",(req,resp)=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Castillo105.dct',
        database : 'alumnos'
    });
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
    });
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            connection.end();
            resp.jsonp(results);
    });
});


app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});