const db = require('../config/config_database');


const Preceptor = {

    create: async (id_sr, id_usr) => {
        const query = 'INSERT INTO PRECEPTOR (id_sr, id_usr) VALUES (?, ?)';
        try {
            await db.execute(query, [id_sr, id_usr]);
        } catch (error) {
            throw new Error('Error al crear el Preceptor: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PRECEPTOR';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener el Preceptor: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM PERSONA WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la persona por DNI: ' + error.message);
        }
    },

    update: async (id_sr, id_usr, dni) => {
        const query = 'UPDATE PRECEPTOR SET id_sr = ?, id_usr = ?  WHERE dni = ?';
        try {
            const result = await db.execute(query, [id_sr, id_usr, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el Preceptor con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Preceptor actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la persona: ' + error.message);
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

            return { message: "Persona eliminada con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la persona: ' + error.message);
        }
    }
};

module.exports = Preceptor;
