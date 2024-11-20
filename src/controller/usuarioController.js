const express = require('express');
const router = express.Router();
const model = require('../model/usuario.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { rulesUser, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para USUARIO --
// ----------------------------------------------------------

router.get('/', listar_usuarios);
router.get('/:nombre_usr', buscarPorNombre);
router.post('/', rulesUser(), validate, crear_usuario);
router.put('/:id_usr', actualizar_usuario);
router.delete('/:id_usr', eliminar_usuario);
router.post('/login', login);


// -------------------------------------------------------------- 
// -- funciones utilizadas por el router  ----------------------- 
// --------------------------------------------------------------

function listar_usuarios(req, res) {
    model.findAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

async function listar_usuarios(req, res) {
    try {
        const results = await model.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function buscarPorNombre(req, res) {
    const { nombre_usr } = req.params;
    try {
        const result = await model.findByNombre(nombre_usr);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function crear_usuario(req, res) {
    const { rol_usr, nombre_usr, psw_usr, id_pers } = req.body;
    try {
        const result = await model.create(rol_usr, nombre_usr, psw_usr, id_pers);
        res.status(201).json(result);
        if (rol_usr == 'Profesor') {
            
        } else {
            
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

    // console.log('paso por aqui y los datos son validos')
}

async function actualizar_usuario(req, res) {
    const { id_usr } = req.params;
    const { rol_usr, nombre_usr, psw_usr, id_pers } = req.body;
    try {
        await model.update(id_usr, rol_usr, nombre_usr, psw_usr, id_pers );
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminar_usuario(req, res) {
    const { id_usr } = req.params;
    try {
        await model.delete(id_usr);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { nombre_usr, psw_usr } = req.body;
        const [result] = await model.findByMail(nombre_usr);
        const iguales = bcrypt.compareSync(psw_usr, result.psw_usr);
        if (iguales) {
            let user = {
                rol_usr: result.rol_usr,
                nombre_usr: result.nombre_usr,
            }
            jwt.sign(user, 'ultraMegaSecretPass', { expiresIn: '10000s' }, (err, token) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.status(200).json({ datos: user, token: token });
                }
            })
        } else {
            res.status(403).send({ message: 'Contraseña Incorrecta' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


module.exports = router;


