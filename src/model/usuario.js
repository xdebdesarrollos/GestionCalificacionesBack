const db = require('../config/config_database');
const bcrypt = require('bcrypt');
const modelpre = require('../model/preceptor');
const modelpro = require('../model/profesor');
const modeltut = require('../model/tutor');
const modelalu = require('../model/alumno');

const Usuario = {

    //registrarse como usuario
    //
    create: async (rol_usr, nombre_usr, psw_usr, id_pers) => {
        const hashedPass = await bcrypt.hash(psw_usr, 10); // Hasheamos la contraseña y reemplazamos pass por hashedPass
        let textoHashed = bcrypt.hashSync("texto a encriptar",10);
        try {
            const params = [rol_usr, nombre_usr, hashedPass, id_pers];
            const consulta = 'INSERT INTO usuario (rol_usr, nombre_usr, psw_usr, id_pers) VALUES (?, ?, ?, ?)';
            const result = await db.execute(consulta, params);
            //Carga en un variable el valor del objeto que contiene el id del usuario
            const response = {detail:result};           
            // Acceder al insertId del objeto, es el id del usuario creado
            const id_usr = response.detail[0]?.insertId;
            //Pregunta si el usuario que se insertó es preceptor, entonces carga los id en la tabla preceptor,
            // cargando como situación de revista 1, puede ser actualizada despues
            if(rol_usr == 'Preceptor')
            {
                try {
                    await modelpre.create(1, id_usr);
                    return { message: `Usuario ${id_usr} creado con exito. Registro insertado en tabla Preceptor ${id_usr}`, detail: result };
                    //res.status(201).json({ message: 'Preceptor creado correctamente' });
                } catch (err) {
                    return { message: `Usuario no creado y registro no insertado en tabla Preceptor ${id_usr}`};
                    //res.status(500).json({ error: err.message });
                }
            }    
           // return { message: `Usuario ${id_usr} creado con exito`, detail: result };
           //Pregunta si es Profesor el usuario creado, asi carga los id en trabla profesor, id_sr 1
           if(rol_usr == 'Profesor')
            {
                try {
                    await modelpro.create(1, id_usr);
                    return { message: `Usuario ${id_usr} creado con exito. Registro insertado en tabla Profesor ${id_usr}`, detail: result };
                    //res.status(201).json({ message: 'Preceptor creado correctamente' });
                } catch (err) {
                    return { message: `Usuario no creado y registro no insertado en tabla Profesor ${id_usr}`};
                    //res.status(500).json({ error: err.message });
                }
            }   
            //Pregunta si es Tutor el usuario creado, asi carga los id en trabla tutor
           if(rol_usr == 'Tutor')
            {
                try {
                    await modeltut.create(id_usr);
                    return { message: `Usuario ${id_usr} creado con exito. Registro insertado en tabla Tutor ${id_usr}`, detail: result };
                    //res.status(201).json({ message: 'Preceptor creado correctamente' });
                } catch (err) {
                    return { message: `Usuario no creado y registro no insertado en tabla Tutor ${id_usr}`};
                    //res.status(500).json({ error: err.message });
                }
            } 
            //Pregunta si es Alumno el usuario creado, asi carga los id en trabla Alumno
           if(rol_usr == 'Alumno')
            {
                try {
                    await modelalu.create(3, id_usr);
                    return { message: `Usuario ${id_usr} creado con exito. Registro insertado en tabla Tutor ${id_usr}`, detail: result };
                    //res.status(201).json({ message: 'Preceptor creado correctamente' });
                } catch (err) {
                    return { message: `Usuario no creado y registro no insertado en tabla Tutor ${id_usr}`};
                    //res.status(500).json({ error: err.message });
                }
            }   
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Existe un usuario con los mismos datos: ' + error.message);
            } else if (error.code === 'ER_BAD_NULL_ERROR') {
                throw new Error('La columna no puede ser nula: ' + error.message);
            } else if (error.code === 'ER_NO_REFERENCED_ROW') {
                throw new Error(' Falla en la restricción de clave externa.: ' + error.message);
            } else {
                throw new Error('No se pudo registrar al usuario debido a: ' + error.message);
            }
        }
    },

    findAll: async () => {
        const query = 'SELECT * FROM usuario';
        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    },


    //un metodo que utiliza la funcion del login para saber si existe ese usuario o no
    findByNombre: async (nombre_usr) => {
        try {
            const consulta = `SELECT u.nombre_usr, p.nombre, p.apellido, p.email, u.psw_usr
                              FROM usuario u INNER JOIN persona p ON u.id_pers = p.id_pers AND u.nombre_usr = ?`;
            const [result] = await db.execute(consulta, [nombre_usr]);
            if (result.length == 0) {
                throw new Error(`Usuario no encontrado con el mail : ${nombre_usr}`);
            }
            return result; //si no saltó el error en el if anterior entoces se devuelve el resultado
        } catch (error) {
            throw new Error(error.message);
        }
    },


    findById: async (id_usr) => {
        const query = 'SELECT * FROM usuario WHERE id_usr = ?';
        try {
            const [rows] = await db.execute(query, [id_usr]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el usuario: ' + error.message);
        }
    },

    update: async (rol_usr, nombre_usr, psw_usr, id_usr, id_pers) => {
        const hashedPass = await bcrypt.hash(psw_usr, 10);
        const query = 'UPDATE usuario SET rol_usr = ?, nombre_usr = ?, psw_usr = ? WHERE id_usr = ?';
        try {
            await db.execute(query, [rol_usr, nombre_usr, hashedPass, id_usr, id_pers]);
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    },

    delete: async (id_usr) => {
        const query = 'DELETE FROM usuario WHERE usuario_id = ?';
        try {
            await db.execute(query, [id_usr]);
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
};

module.exports = Usuario;


/*
const sql = 'SELECT * FROM persona WHERE dni = ?';
db.execute(sql, [dni], (err, results) => {
  if (err) throw err;
  console.log(results);
});
*/