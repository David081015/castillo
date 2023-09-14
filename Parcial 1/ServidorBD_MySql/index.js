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

//ALL USERS
app.get('/alumnos', async (req, resp) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM tec');
        resp.json(rows);
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

//SELECT
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

//INSERT INTO
// Ruta para agregar un usuario con parámetros de consulta
app.post('/alumnos', async (req, resp) => {
    try {
        const id = req.query.idtec;
        const nom = req.query.nombre;
        const ape = req.query.apellido;
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('INSERT INTO tec (idtec, nombre, apellido) VALUES (?, ?, ?)', [id, nom, ape]);
        
        resp.status(201).json({ mensaje: 'Usuario agregado correctamente'});
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

//UPDATE
app.put('/alumnos', async (req, resp) => {
    try {
        const id = req.query.idtec;
        const nom = req.query.nombre;
        const ape = req.query.apellido;
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('UPDATE tec SET nombre=?, apellido=? WHERE idtec=?', [nom, ape, id]);

        if (result.affectedRows === 0) {
            resp.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            resp.json({ mensaje: 'Usuario modificado correctamente' });
        }
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});


//DELETE
app.delete('/alumnos', async (req, resp) => {
    try {
        const id = req.query.idtec;
        console.log(id);
        const conexion = await mysql.createConnection(dataDeBase);
        const query = "DELETE FROM tec WHERE idtec = "+id;
        const [rows, fields] = await conexion.query(query);
        if (rows.affectedRows === 0) {
            resp.json({ mensaje: 'Registro No Eliminado' });
        } else {
            resp.json({ mensaje: 'Registro Eliminado' });
        }
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

app.listen(8084, () => {
    console.log('Servidor express escuchando');
});
