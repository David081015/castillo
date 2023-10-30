const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const jsonwebtoken = require('jsonwebtoken');

const app = express();

// Middleware para analizar solicitudes con datos JSON y URL codificados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para habilitar el uso de CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configuración para registrar solicitudes en un archivo de registro
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Datos de la base de datos
const dataDeBase = {
    host: 'localhost',
    user: 'root',
    password: 'Castillo105.dct',
    database: 'jwt',
};

// Ruta de inicio
app.get('/', function (req, res) {
    res.send('hello, world!');
});

// Ruta de inicio de sesión (login)
app.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Crear una conexión a la base de datos
        const conexion = await mysql.createConnection(dataDeBase);
        // Consultar la base de datos para buscar el usuario con las credenciales proporcionadas
        const [rows, fields] = await conexion.query('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña]);

        if (rows.length === 1) {
            // Usuario autenticado, generar un token JSON Web Token (JWT)
            const token = jsonwebtoken.sign({ correo }, 'claveSecreta');
            res.json({ token });
        } else {
            // Credenciales inválidas
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    } catch (err) {
        // Error de conexión o consulta a la base de datos
        res.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

// Ruta protegida que requiere un token válido
app.get('/sistemas', verificarToken, function (req, res) {
    res.json({ mensaje: 'Acceso concedido a la ruta sistemas' });
});

// Función para verificar la validez del token en las rutas protegidas
function verificarToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.substring(7);

    if (!token) {
        // Token no proporcionado
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jsonwebtoken.verify(token, 'claveSecreta', function (err, decoded) {
        if (err) {
            // Acceso no concedido debido a un token inválido
            res.status(403).json({ mensaje: 'Acceso no concedido a la ruta sistemas' });
        } else {
            // Token válido, continuar con la solicitud
            next();
        }
    });
}

// Iniciar el servidor en el puerto 8084
app.listen(8084, function () {
    console.log('Servidor express escuchando en el puerto 8084');
});