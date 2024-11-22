const model = require('../model/curso');
const express = require('express');
const router = express.Router();

const { cursoRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_cursos);
router.get('/:nom_curso', buscarPorCurso);
router.post('/', cursoRules(), validate, crear_curso);
router.put('/:id_curso', actualizar_curso);
router.delete('/:nom_curso', eliminar_curso);

// Funciones CRUD

async function listar_cursos(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorCurso(req, res) {
    const { nom_curso } = req.params;
    try {
        const results = await model.findByCurso(nom_curso);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_curso(req, res) {
    const { nom_curso } = req.body;
    try {
        await model.create(nom_curso);
        res.status(201).json({ message: 'Curso creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_curso(req, res) {
    const { id_curso } = req.params;
    const { nom_curso } = req.body;
    try {
        await model.update(nom_curso, id_curso);
        res.status(200).json({ message: 'Curso actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_curso(req, res) {
    const { nom_curso } = req.params;
    try {
        const result = await model.delete(nom_curso);

        res.status(200).json({ message: 'Curso eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
