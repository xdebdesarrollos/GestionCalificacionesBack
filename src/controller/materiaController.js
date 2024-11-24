const model = require('../model/materia');
const express = require('express');
const router = express.Router();

const { materiaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_materias);
router.get('/:nom_materia', buscarPorMateria);
router.post('/', materiaRules(), validate, crear_materia);
router.put('/:id_materia', actualizar_materia);
router.delete('/:nom_materia', eliminar_materia);

// Funciones CRUD

async function listar_materias(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorMateria(req, res) {
    const { nom_materia } = req.params;
    try {
        const results = await model.findByMateria(nom_materia);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_materia(req, res) {
    const { nom_materia } = req.body;
    try {
        await model.create(nom_materia);
        res.status(201).json({ message: 'MATERIA creada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_materia(req, res) {
    const { id_materia } = req.params;
    const { nom_materia } = req.body;
    try {
        await model.update(nom_materia, id_materia);
        res.status(200).json({ message: 'Materia actualizada correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_materia(req, res) {
    const { nom_materia } = req.params;
    try {
        const result = await model.delete(nom_materia);

        res.status(200).json({ message: 'Materia eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
