const request = require('supertest');
const app = require('./tu_aplicacion_express'); // Importa tu aplicación Express

describe('Pruebas de integración', () => {
  it('Debería obtener una respuesta exitosa', async () => {
    const response = await request(app).get('/ruta_de_prueba');
    expect(response.status).toBe(200);
  });

  it('Debería comprobar una respuesta JSON válida', async () => {
    const response = await request(app).get('/ruta_de_prueba');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensaje', 'Hola, mundo');
  });
});


