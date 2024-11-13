const db = require('../config/config_database');


const Persona = {

    create: async (nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom) => {
        const query = 'INSERT INTO PERSONA (nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom) VALUES (?, ?, ?)';
        try {
            await db.execute(query, [nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom]);
        } catch (error) {
            throw new Error('Error al crear la persona: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PERSONA';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las personas: ' + error.message);
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

    update: async (nombre, apellido, dni, cuil, fec_nac, email, cel, id_dom) => {
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

module.exports = Persona;
