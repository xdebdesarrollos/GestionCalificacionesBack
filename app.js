const express = require('express');
const config = require('./src/config/config.json');
const app = express();

var cors = require('cors');
app.use(cors());

var morgan = require('morgan')
app.use(morgan('common'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//conocer los distintos controladores, saber donde estan, traelos como constantes locales
const personaController = require('./src/controller/personaController');
const usuarioController = require('./src/controller/usuarioController');
const provinciaController = require('./src/controller/provinciaController');
const materiaController = require('./src/controller/materiaController');
const cursoController = require('./src/controller/cursoController');
const preceptorController = require('./src/controller/preceptorController');
const profesorController = require('./src/controller/profesorController');
const tutorController = require('./src/controller/tutorController');
const alumnoController = require('./src/controller/alumnoController');
const localidadController = require('./src/controller/localidadController');
const registerController = require('./src/controller/registerController');

//redireccionar las distintas peticiones a su correspondiente controlador.
app.use("/persona", personaController); //ejemplo de peticion --> https://localhost:8080/persona/listar_personas
app.use('/usuario', usuarioController);
app.use('/provincia', provinciaController);
app.use("/materia", materiaController); //ejemplo de peticion --> https://localhost:8080/materia/crear_materia
app.use('/curso', cursoController);
app.use('/preceptor', preceptorController);
app.use('/profesor', profesorController);
app.use('/tutor', tutorController);
app.use('/alumno', alumnoController);
app.use('/localidad', localidadController);
app.use('/register', registerController);


// funcion que intenta iniciar el servidor en el puerto especificado o en el siguiente disponible
function startServer(puerto) {
    const server = app.listen(puerto, () => {
        console.log(`Servidor escuchando en: http://localhost:${puerto}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
            puerto++;
            startServer(puerto); // Intenta con el siguiente puerto
        } else {
            console.error("Error al iniciar el servidor:", err);
        }
    });
}

// invocamos la funcion que intenta iniciar el servidor en el puerto que le pasemos
startServer(config.server.port);

module.exports = app;