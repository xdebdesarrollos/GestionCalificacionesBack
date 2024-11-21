const db = require('../config/config_database');


const localidad = {

    create: async (nom_loc, id_prov) => {
        const query = 'INSERT INTO LOCALIDAD (nom_loc, id_prov) VALUES (?, ?)';
        try {
            await db.execute(query, [nom_loc, id_prov]);
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

    findByNombre: async (nom_loc) => {
        const query = 'SELECT * FROM LOCALIDAD WHERE nombre_loc = ?';
        try {
            const [rows] = await db.execute(query, [nom_loc]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar la LOCALIDAD por NOMBRE: ' + error.message);
        }
    },

   update: async (nom_loc, id_loc) => {
        const query = 'UPDATE LOCALIDAD SET nombre_loc= ?  WHERE id_loc = ?';
        try {
            const result = await db.execute(query, [id_loc]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una LOCALIDAD con el Nombre: ${nom_loc}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Localidad actualizada con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la Localidad: ' + error.message);
        }
    },
    
    delete: async (nom_loc) => {
        try {
            const query = 'DELETE FROM LOCALIDAD WHERE nom_loc = ?';
            const result = await db.execute(query, [nom_loc]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro una Localidad con el NOMBRE: ${nom_loc}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Localidad eliminada con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar la Localidad: ' + error.message);
        }
    }
};

module.exports = localidad;
