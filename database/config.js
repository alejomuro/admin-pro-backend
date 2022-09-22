const mongoose = require('mongoose');

//funcion encargada para establecer la conexion
//con el async hace que retorne una promesa, await es espere a que todo esto pase
//luego para usar la funcion la exportamos al final 

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
           // useCreateIndex:true
        });
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de iniciar la BD ver logs');
        
    }
}
//exportamos la funcion y usamos el db coneccion en el index
module.exports = {
    dbConnection
}
