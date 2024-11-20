const model = require('../model/alumno');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_alumnos);
router.get('/:dni', buscarPorDni);
router.post('/', crear_alumno);
router.put('/:dni', actualizar_alumno);
router.delete('/:dni', eliminar_alumno);

// Funciones CRUD

async function listar_alumnos(req, res) {
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
            return res.status(404).json({ message: 'TAlumno no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_alumno(req, res) {
    const { id_tut, id_usr } = req.body;
    try {
        await model.create(id_tut, id_usr);
        res.status(201).json({ message: 'Tutor creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_alumno(req, res) {
    const { dni } = req.params;
    const { id_tut, id_usr } = req.body;
    try {
        await model.update(id_tut, id_usr, dni);
        res.status(200).json({ message: 'Alumno actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_alumno(req, res) {
    const { dni } = req.params;
    try {
        const result = await model.delete(dni);

        res.status(200).json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = router;
