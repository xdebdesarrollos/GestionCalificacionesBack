const model = require('../model/localidad.js');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_localidad);
router.get('/:nombre_prov', buscarPorNombre);
router.post('/', personaRules(), validate, crear_localidad);
router.put('/:id_prov', actualizar_localidad);
router.delete('/:nombre_prov', eliminar_localidad);

// Funciones CRUD

async function listar_localidad(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorNombre(req, res) {
    const { nombre_loc } = req.params;
    try {
        const results = await model.findByNombre(nombre_loc);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_localidad(req, res) {
    const { nombre_loc } = req.body;
    try {
        await model.create(nombre_loc);
        res.status(201).json({ message: 'Localidad creada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_localidad(req, res) {
    const { id_loc} = req.params;
    const { nombre_loc } = req.body;
    try {
        await model.update(nombre_loc, id_loc);
        res.status(200).json({ message: 'Localidad actualizada correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_localidad(req, res) {
    const { nombre_loc } = req.params;
    try {
        const result = await model.delete(nombre_loc);

        res.status(200).json({ message: 'Localidad eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
