const model = require('./model/Provincia.js');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.get('/', listar_provincia);
router.get('/:nombre_prov', buscarPorNombre);
router.post('/', provinciaRules(), validate, crear_provincia);
router.put('/:nombre_prov', actualizar_provincia);
router.delete('/:nombre_prov', eliminar_provincia);

// Funciones CRUD

async function listar_provincia(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorNombre(req, res) {
    const { nombre_prov } = req.params;
    try {
        const results = await model.findByDni(nombre_prov);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Provincia no encontrada' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function crear_provincia(req, res) {
    const { nombre_prov } = req.body;
    try {
        await model.create(nombre_prov);
        res.status(201).json({ message: 'Provincia creada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizar_provincia(req, res) {
    const { nombre_prov } = req.params;
    //const { nombre, apellido, cuil, fec_nac, email, cel, id_dom } = req.body;
    try {
        await model.update(nombre_prov);
        res.status(200).json({ message: 'Provincia actualizada correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminar_provincia(req, res) {
    const { nombre_prov } = req.params;
    try {
        const result = await model.delete(nombre_prov);

        res.status(200).json({ message: 'Provincia eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = router;
