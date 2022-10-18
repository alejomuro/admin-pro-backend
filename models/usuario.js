//paquete de mongoose, extraemos el Schema y el model
const {Schema, model} = require('mongoose');

//dentro del schema esta la definicion de cada uno de los registros que va a estar dentro de una tabla de usuarios.
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        require:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
});

//para cambiarle el nombre al campo
//agarramos el usuarioschema y sobreescribir el metodo 
UsuarioSchema.method('toJSON', function(){
    //instancia del objeto actual, extraemos varias cosas del objeto ...object es el resto del objeto
   const{__v,_id,password, ...object} = this.toObject();
   object.uid=_id;
   
 

   return object;
})




//implementamos el modelo, exponemos hacia afuera para cualquier persona que necesite crear usuarios,
//se expone el modelo va a tener instrucciones para grabar hacer querys y para hacer CRUD en esta tabla
module.exports=model('Usuario', UsuarioSchema);