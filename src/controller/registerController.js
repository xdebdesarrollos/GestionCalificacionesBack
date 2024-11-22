const modelpers = require('../model/persona');
const modelusr = require('../model/usuario');
const express = require('express');
const router = express.Router();

const { personaRules, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para PERSONA --
// ----------------------------------------------------------

router.post('/', crear_registro);

// Funciones CRUD

async function crear_registro(req, res) {
    const { nombre, apellido, dni, cuil, fec_nac, email, cel, domicilio, id_loc, rol_usr, nombre_usr, psw_usr } = req.body;
    try {
        // Crear la persona y obtiene el id_pers generado por el return del modelo persona
        const id_pers= await modelpers.create(
            nombre,
            apellido,
            dni,
            cuil,
            fec_nac,
            email,
            cel,
            domicilio,
            id_loc
        );

        await modelusr.create(
            rol_usr,
            nombre_usr,
            psw_usr,
            id_pers
    );

        // Respuesta final al cliente
        res.status(201).json({ message: 'Persona y usuario creados correctamente' });
    } catch (err) {
        console.error('Error al crear registro:', err.message);
        res.status(500).json({ error: `Ocurrió un error al procesar la solicitud: `});
    }
}
module.exports = router;
