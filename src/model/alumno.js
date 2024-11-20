const db = require('../config/config_database');


const Alumno = {

    create: async (id_tut, id_usr) => {
        const query = 'INSERT INTO ALUMNO (id_tut, id_usr) VALUES (?, ?)';
        try {
            await db.execute(query, [id_tut, id_usr]);
        } catch (error) {
            throw new Error('Error al crear el Alumno: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM ALUMNO';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener el Alumno: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM ALUMNO WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el Alumno por DNI: ' + error.message);
        }
    },

    update: async (id_tut, id_usr, dni) => {
        const query = 'UPDATE ALUMNO SET id_tut, id_usr = ?  WHERE dni = ?';
        try {
            const result = await db.execute(query, [id_tut, id_usr, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Alumno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Alumno actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el Alumno: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM ALUMNO WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Alumno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Alumno eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar el Alumno: ' + error.message);
        }
    }
};

module.exports = Alumno;