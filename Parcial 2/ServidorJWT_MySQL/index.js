const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const jsonwebtoken = require('jsonwebtoken');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const dataDeBase = {
    host: 'localhost',
    user: 'root',
    password: 'Castillo105.dct',
    database: 'jwt',
};

app.get('/', function (req, res) {
    res.send('hello, world!');
});

// Login route
app.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña]);

        if (rows.length === 1) {
            // User authenticated, generate a token
            const token = jsonwebtoken.sign({ correo }, 'claveSecreta');
            res.json({ token });
        } else {
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

// Protected route
app.get('/sistemas', verificarToken, function (req, res) {
    res.json({ mensaje: 'Acceso concedido a ruta sistema' });
});

function verificarToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.substring(7);

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jsonwebtoken.verify(token, 'claveSecreta', function (err, decoded) {
        if (err) {
            res.status(403).json({ mensaje: 'Acceso no concedido a ruta sistemas' });
        } else {
            next();
        }
    });
}

app.listen(8084, function () {
    console.log('Servidor express escuchando en puerto 8084');
});
