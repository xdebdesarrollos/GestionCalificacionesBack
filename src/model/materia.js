const db = require('../config/config_database');


const materia = {

    create: async (nom_materia) => {
        const query = 'INSERT INTO MATERIA (nom_materia) VALUES (?)';
        try {
            await db.execute(query, [nom_materia]);
        } catch (error) {
            throw new Error('Error al crear la MATERIA: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM MATERIA';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las MATERIAS: ' + error.message);
        }
    },

    findByMateria: async (nom_materia) => {
        const query = 'SELECT * FROM MATERIA WHERE nom_materia = ?';
        try {
            const [rows] = await db.execute(query, [nom_materia]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la MATERIA por NOMBRE: ' + error.message);
        }
    },

    update: async (nom_materia, id_materia) => {
        const query = 'UPDATE MATERIA SET nom_materia = ? WHERE id_materia = ?';
        try {
            const result = await db.execute(query, [id_materia]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro la meteria con el nombre: ${nom_materia}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Persona actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la persona: ' + error.message);
        }
    },

    delete: async (nom_materia) => {
        try {
            const query = 'DELETE FROM MATERIA WHERE nom_materia = ?';
            const result = await db.execute(query, [nom_materia]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una Materia con el nombre: ${nom_materia}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Materia eliminada con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la Materia: ' + error.message);
        }
    }
};

module.exports = materia;
