
const Producto = require('../models/Producto');

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar productos', error: error.message });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensaje: 'Identificador inválido' });
        }

        res.status(500).json({ mensaje: 'Error al consultar producto', error: error.message });
    }
};

const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();

        res.status(201).json(productoGuardado);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
        }

        res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                overwrite: true
            }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        if (error.name === 'CastError' || error.name === 'ValidationError') {
            return res.status(400).json({ mensaje: 'Datos o identificador inválidos', error: error.message });
        }

        res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensaje: 'Identificador inválido' });
        }

        res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
