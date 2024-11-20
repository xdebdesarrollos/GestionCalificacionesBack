const db = require('../config/config_database');


const provincia = {

    create: async (nombre_loc) => {
        const query = 'INSERT INTO LOCALIDAD (nombre_loc) VALUES (?)';
        try {
            await db.execute(query, [nombre_loc]);
        } catch (error) {
            throw new Error('Error al crear la Localidad: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM LOCALIDAD';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las Localidades: ' + error.message);
        }
    },

    findByNombre: async (nombre_loc) => {
        const query = 'SELECT * FROM LOCALIDAD WHERE nombre_loc = ?';
        try {
            const [rows] = await db.execute(query, [nombre_loc]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la LOCALIDAD por NOMBRE: ' + error.message);
        }
    },

   update: async (nombre_loc, id_loc) => {
        const query = 'UPDATE LOCALIDAD SET nombre_loc= ?  WHERE id_loc = ?';
        try {
            const result = await db.execute(query, [id_loc]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una LOCALIDAD con el Nombre: ${nombre_loc}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Localidad actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la Localidad: ' + error.message);
        }
    },
    
    delete: async (nombre_loc) => {
        try {
            const query = 'DELETE FROM LOCALIDAD WHERE nombre_loc = ?';
            const result = await db.execute(query, [nombre_loc]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una Localidad con el NOMBRE: ${nombre_loc}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Localidad eliminada con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la Localidad: ' + error.message);
        }
    }
};

module.exports = provincia;
