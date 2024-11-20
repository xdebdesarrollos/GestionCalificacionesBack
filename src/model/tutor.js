const db = require('../config/config_database');


const Tutor = {

    create: async (id_usr) => {
        const query = 'INSERT INTO TUTOR (id_usr) VALUES (?)';
        try {
            await db.execute(query, [id_usr]);
        } catch (error) {
            throw new Error('Error al crear el Tutor: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM TUTOR';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener el Tutor: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM TUTOR WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el Tutor por DNI: ' + error.message);
        }
    },

    update: async (id_usr, dni) => {
        const query = 'UPDATE TUTOR SET id_usr = ?  WHERE dni = ?';
        try {
            const result = await db.execute(query, [id_usr, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Tutor con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Tutor actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el Tutor: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM TUTOR WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Tutor con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Tutor eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar el Tutor: ' + error.message);
        }
    }
};

module.exports = Tutor;
