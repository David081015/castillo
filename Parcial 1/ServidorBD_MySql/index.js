const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', function (req, res) {
    res.send('hello, world!');
});

const dataDeBase = {
    host: 'localhost',
    user: 'root',
    password: 'Castillo105.dct',
    database: 'alumnos',
};

app.get('/alumnos/:id', async (req, resp) => {
    try {
        console.log(req.params.id);
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM tec WHERE idtec=' + req.params.id);
        if (rows.length === 0) {
            resp.status(404);
            resp.json({ mensaje: 'Usuario no existe' });
        } else {
            resp.json(rows);
        }
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

app.listen(8080, () => {
    console.log('Servidor express escuchando');
});
