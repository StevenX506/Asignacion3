require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Inventario funcionando' });
});

app.use('/api/productos', productoRoutes);

const iniciarServidor = async () => {
    await conectarDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
};

iniciarServidor();
