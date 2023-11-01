const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8084;

app.use(express.json()); // Habilita el análisis del cuerpo JSON

app.post('/albums', async (req, res) => {
    try {
        // Obtén el token y el nombre del artista del cuerpo de la solicitud
        const { accessToken, artistName } = req.body;

        if (!accessToken) {
            return res.status(400).json({ error: 'Falta el token de acceso en el cuerpo de la solicitud' });
        }

        if (!artistName) {
            return res.status(400).json({ error: 'Falta el nombre del artista en el cuerpo de la solicitud' });
        }

        const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=album`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const searchData = searchResponse.data;

        if (searchData.albums && searchData.albums.items && searchData.albums.items.length > 0) {
            const albums = searchData.albums.items;

            // Mapea los álbumes para mostrar solo los títulos
            const albumTitles = albums.map(album => album.name);

            res.json(albumTitles);
        } else {
            res.json({ error: `Álbumes de ${artistName} no encontrados` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
  console.log(`API en ejecución en el puerto ${PORT}`);
});