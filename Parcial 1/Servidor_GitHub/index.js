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
    res.status(500).json({ error: 'Error al obtener información del usuario de GitHub.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
