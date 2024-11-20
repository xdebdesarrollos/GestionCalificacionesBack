const model = require('../model/tutor');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_tutores);
router.get('/:dni', buscarPorDni);
router.post('/', crear_tutor);
router.put('/:dni', actualizar_tutor);
router.delete('/:dni', eliminar_tutor);

// Funciones CRUD

async function listar_tutores(req, res) {
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
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_tutor(req, res) {
    const { id_usr } = req.body;
    try {
        await model.create(id_usr);
        res.status(201).json({ message: 'Tutor creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_tutor(req, res) {
    const { dni } = req.params;
    const { id_usr } = req.body;
    try {
        await model.update(id_usr, dni);
        res.status(200).json({ message: 'Tutor actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_tutor(req, res) {
    const { dni } = req.params;
    try {
        const result = await model.delete(dni);

        res.status(200).json({ message: 'tutor eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = router;
