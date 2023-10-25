const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Castillo105.dct',
  database: 'jwt'
});

app.post('/login', function (req, res, next) {
    const { correo, contraseña } = req.body;
    const conexion = mysql.createConnection(db);
    conexion.query(
      'SELECT * FROM usuarios WHERE correo = ? AND contraseña= ?',
      [correo, contraseña],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error en la base de datos' });
        } else if (rows.length === 1) {
          const user = { correo: rows[0].correo, id: rows[0].id };
          const token = jsonwebtoken.sign(user, 'claveSecreta');
          console.log(token);
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      }
    );
  });
  

app.get('/sistemas', verificarToken, function (req, res, next) {
  res.json({ mensaje: 'Acceso concedido a ruta sistema' });
});

app.listen(8084, function () {
  console.log('Servidor express escuchando en puerto 8084');
});

function verificarToken(req, res, next) {
  console.log(req.headers.authorization);
  let token = req.headers.authorization.substring(7, req.headers.authorization.length);
  jsonwebtoken.verify(token, 'claveSecreta', function (err, decoded) {
    if (err) {
      res.json({ Error: 'Acceso no concedido a ruta sistemas' });
    } else {
      next();
    }
  });
}