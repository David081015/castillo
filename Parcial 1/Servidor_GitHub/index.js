const express = require('express');
const bearerToken = require('express-bearer-token');
const axios = require('axios');

const app = express();
const port = 8084;

app.use(express.json());
app.use(bearerToken());

// Middleware para verificar si se proporciona un token de portador válido
app.use((req, res, next) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: 'Token de portador no proporcionado.' });
  }

  next(); // Continúa con la solicitud si el token es válido.
});

// Ruta para obtener información del usuario de GitHub
app.get('/github', async (req, res) => {
  try {
    const token = req.token;
    const response = await axios.get('https://api.github.com/users/David081015/repos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data;
    res.json(userData);
  } catch (error) {
    console.error('Error al obtener información del usuario de GitHub:', error);

    // Devolver un error más específico en la respuesta
    if (error.response) {
      // Si la solicitud a la API de GitHub devolvió una respuesta con un estado de error, puedes usar esa información.
      res.status(error.response.status).json({ error: 'Error al obtener información del usuario de GitHub.', message: error.message });
    } else {
      // Si ocurrió otro tipo de error, puedes manejarlo aquí.
      res.status(500).json({ error: 'Error al obtener información del usuario de GitHub.', message: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});