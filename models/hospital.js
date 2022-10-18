//paquete de mongoose, extraemos el Schema y el model
const {Schema, model} = require('mongoose');

//dentro del schema esta la definicion de cada uno de los registros que va a estar dentro de una tabla de usuarios.
const HospitalSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    //Usuario que creo el hospital, es de tipo especial
    //le indica a mongoose que va a haber una relacion de este schema con el de usuario y lo ponemos en la ref
    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
    //para cambiar el nombre del schema 
},{collection:'hospitales'});

//para cambiarle el nombre al campo
//agarramos el usuarioschema y sobreescribir el metodo 
HospitalSchema.method('toJSON', function(){
    //instancia del objeto actual, extraemos varias cosas del objeto ...object es el resto del objeto
   const{__v, ...object} = this.toObject();
   return object;
})


//implementamos el modelo, exponemos hacia afuera para cualquier persona que necesite crear usuarios,
//se expone el modelo va a tener instrucciones para grabar hacer querys y para hacer CRUD en esta tabla
module.exports=model('Hospital', HospitalSchema);