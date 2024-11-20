const db = require('../config/config_database');


const Profesor = {

    create: async (id_sr, id_usr) => {
        const query = 'INSERT INTO PROFESOR (id_sr, id_usr) VALUES (?, ?)';
        try {
            await db.execute(query, [id_sr, id_usr]);
        } catch (error) {
            throw new Error('Error al crear el Profesor: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PROFESOR';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener el Profesor: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM PERSONA WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la Profesor en tabla persona por DNI: ' + error.message);
        }
    },

    update: async (id_sr, id_usr, dni) => {
        const query = 'UPDATE PROFESOR SET id_sr = ?, id_usr = ?  WHERE dni = ?';
        try {
            const result = await db.execute(query, [id_sr, id_usr, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Profesor con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Profesor actualizado con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el Profesor: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM PERSONA WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una persona con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Profesor eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar el Profesor: ' + error.message);
        }
    }
};

module.exports = Profesor;
