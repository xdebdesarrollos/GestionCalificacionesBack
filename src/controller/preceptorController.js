const model = require('../model/preceptor');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_preceptores);
router.get('/:dni', buscarPorDni);
router.post('/', crear_preceptor);
router.put('/:dni', actualizar_preceptor);
router.delete('/:dni', eliminar_preceptor);

// Funciones CRUD

async function listar_preceptores(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorDni(req, res) {
    const { dni } = req.params;
    try {
        const results = await model.findByDni(dni);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Preceptor no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_preceptor(req, res) {
    const { id_sr, id_usr } = req.body;
    try {
        await model.create(id_sr, id_usr);
        res.status(201).json({ message: 'Preceptor creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_preceptor(req, res) {
    const { dni } = req.params;
    const { id_sr, id_usr } = req.body;
    try {
        await model.update(id_sr, id_usr, dni);
        res.status(200).json({ message: 'Preceptor actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_preceptor(req, res) {
    const { dni } = req.params;
    try {
        const result = await model.delete(dni);

        res.status(200).json({ message: 'Preceptor eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
