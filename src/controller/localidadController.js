const model = require('../model/localidad.js');
const express = require('express');
const router = express.Router();

const { localidadRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_localidad);
router.get('/:nom_loc', buscarPorNombre);
router.post('/', localidadRules(), validate, crear_localidad);
router.put('/:id_loc', actualizar_localidad);
router.delete('/:nom_loc', eliminar_localidad);

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
    const { nom_loc } = req.params;
    try {
        const results = await model.findByNombre(nom_loc);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_localidad(req, res) {
    const { nom_loc, id_prov } = req.body;
    try {
        await model.create(nom_loc, id_prov);
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
    const { nom_loc } = req.params;
    try {
        const result = await model.delete(nom_loc);

        res.status(200).json({ message: 'Localidad eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
