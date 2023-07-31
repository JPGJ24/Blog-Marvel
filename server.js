const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Ruta al directorio que contiene los archivos estáticos (CSS, JS, imágenes, etc.)
const publicDirectoryPath = path.join(__dirname, 'public');

// Configurar express para servir los archivos estáticos desde el directorio "public"
app.use(express.static(publicDirectoryPath));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
