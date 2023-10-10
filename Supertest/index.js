// Importación de módulos necesarios
const request = require('supertest'); // Para realizar pruebas de integración HTTP
const assert = require('assert'); // Para realizar afirmaciones en el código
const express = require('express'); // Para crear una aplicación Express

// Creación de una instancia de la aplicación Express
const app = express();

// Especificación del puerto en el que se escuchará la aplicación
const port = 8084;

// Definición de una ruta GET que responde con un objeto JSON
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

// Uso de supertest para realizar pruebas de integración
request(app)
  .get('/user')
  .expect('Content-Type', /json/) // Se espera que el tipo de contenido sea JSON
  .expect('Content-Length', '15') // Se espera que la longitud del contenido sea 15 caracteres
  .expect(200) // Se espera un código de estado HTTP 200 (OK)
  .end(function(err, res) {
    if (err) throw err;
  });

// Inicio del servidor Express en el puerto especificado
app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});