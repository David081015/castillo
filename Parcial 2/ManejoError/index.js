const express = require('express');
const app = express();
app.use(express.json());

app.get("/Error", (req, res, next) => {
  try {
    // Genera un error intencional
    throw new Error("Error generado para prueba");
  } catch (error) {
    next(error);
  }
});

// Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Hubo un error en el servidor: " + err.message);
});

const port = process.env.PORT || 8084;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
