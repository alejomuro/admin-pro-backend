//aqui se leen las variables de entorno, busca el archivo env y lo establece en las variables de entorno de node 
require('dotenv').config();


const express = require('express');
const cors = require('cors');


const {dbConnection }=require('./database/config');
//const { Router } = require('express');

//crear el servidor express
const app = express();

//configurar CORS.. Use es un middleware es una funcion que se va a ejecutar siempre para las siguentes lineas
app.use(cors());

//carpeta publica..para que se renderice el index.html de public 
app.use(express.static('public'))

//para recibir la informacion del frontEnd, lectura y parseo del body
app.use( express.json() );

//base de datos
dbConnection();

//rutas....usamos en el middleware
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));


//para levantar el servidor
app.listen(process.env.PORT,() => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
})

//INSTALACIONES
//encriptar contraseñas (npm i bcryptjs) lo usamos donde creamos el usuario
//en el JWT npm i jsonwebtoken (helpers JWT)d
//npm i uuid para que no choquen los ID en la parte del uploads
//npm install google-auth-library --save
