const express = require('express');
const catalogo = require('./catalogo.json');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('API del catálogo de ropa. Usa /api/catalogo para ver los productos.');
});

app.get('/api/catalogo', (req, res) => {
  res.json(catalogo);
});

app.get('/api/catalogo/:id', (req, res) => {
  const producto = catalogo.find((p) => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});