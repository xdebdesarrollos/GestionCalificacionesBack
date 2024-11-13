const db = require('../config/config_database');


const Provincia = {

    create: async (nombre_prov) => {
        const query = 'INSERT INTO PROVINCIA (nombre_prov) VALUES (?)';
        try {
            await db.execute(query, [nombre_prov]);
        } catch (error) {
            throw new Error('Error al crear la provincia: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PROVINCIA';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las PROVINCIAS: ' + error.message);
        }
    },

    findByDni: async (nombre_prov) => {
        const query = 'SELECT * FROM PERSONA WHERE nombre_prov = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la PROVINCIA por NOMBRE: ' + error.message);
        }
    },

 /*   update: async (nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom) => {
        const query = 'UPDATE PERSONA SET nombre = ?, apellido = ?, dni = ?, cuil = ?, fec_nac = ?, email = ?, cel = ?, id_dom = ?  WHERE dni = ?';
        try {
            const result = await db.execute(query, [nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una persona con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Persona actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la persona: ' + error.message);
        }
    },
*/
    delete: async (nombre_prov) => {
        try {
            const query = 'DELETE FROM PROVINCIA WHERE nombre_prov = ?';
            const result = await db.execute(query, [nombre_prov]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una PROVINCIA con el NOMBRE: ${nombre_prov}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Provincia eliminada con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la Provincia: ' + error.message);
        }
    }
};

module.exports = Provincia;
