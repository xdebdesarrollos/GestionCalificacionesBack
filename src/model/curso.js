const db = require('../config/config_database');


const curso = {

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
            const query = 'SELECT * FROM CURSO';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los CURSOS: ' + error.message);
        }
    },

    findByCurso: async (nom_curso) => {
        const query = 'SELECT * FROM CURSO WHERE nom_curso = ?';
        try {
            const [rows] = await db.execute(query, [nom_curso]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el CURSO: ' + error.message);
        }
    },

    update: async (nom_curso,  id_curso) => {
        const query = 'UPDATE CURSO SET curso = ? WHERE id_curso = ?';
        try {
            const result = await db.execute(query, [nom_curso, id_curso]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro la meteria con el nombre: ${nom_curso}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Persona actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la persona: ' + error.message);
        }
    },

    delete: async (nom_curso) => {
        try {
            const query = 'DELETE FROM CURSO WHERE nom_curso = ?';
            const result = await db.execute(query, [nom_curso]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro el curso con el nombre: ${nom_curso}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Curso eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar Curso: ' + error.message);
        }
    }
};

module.exports = curso;
