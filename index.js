require('dotenv').config();


const express = require('express');
const cors = require('cors')
//aqui se leen las variables de entorno, busca el archivo env y lo establece en las variables de entorno de node 


const {dbConnection }=require('./database/config');

//crear el servidor express
const app = express();

//configurar CORS.. Use es un middleware es una funcion que se va a ejecutar siempre para las siguentes lineas
app.use(cors())

//base de datos
dbConnection();



//rutas
app.get('/',(req, res)=>{
    res.json({
        ok:true,
        msg:'hola mundo'
    })
})

//para levantar el servidor
app.listen(process.env.PORT,() => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
})