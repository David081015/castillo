const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configurar el logger
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get('/alumnos/:carrera', async (req, resp) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Castillo105.dct',
      database: 'alumnos',
    });

    console.log('Conectado como el ID ' + connection.threadId);

    const [rows] = await connection.query('SELECT * FROM tec');
    connection.end();

    resp.json(rows);
  } catch (error) {
    console.error('Error de conexión:', error.message);
    resp.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

app.listen(8080, () => {
  console.log('Servidor express escuchando en el puerto 8080');
});