const model = require('../model/domicilio');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_domicilio);
router.get('/:direccion', buscarPorDireccion);
router.post('/', personaRules(), validate, crear_domicilio);
router.put('/:direccion', actualizar_domicilio);
router.delete('/:direccion', eliminar_domicilio);

// Funciones CRUD

async function listar_domicilio(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorDireccion(req, res) {
    const { direccion } = req.params;
    try {
        const results = await model.findByDni(direccion);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Domicilio no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_domicilio(req, res) {
    const { direccion, id_loc } = req.body;
    try {
        await model.create(direccion, id_loc);
        res.status(201).json({ message: 'Dirección creada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_persona(req, res) {
    const { dni } = req.params;
    const { nombre, apellido, cuil, fec_nac, email, cel, id_dom } = req.body;
    try {
        await model.update(nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom);
        res.status(200).json({ message: 'Persona actualizada correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_persona(req, res) {
    const { dni } = req.params;
    try {
        const result = await model.delete(dni);

        res.status(200).json({ message: 'Persona eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
