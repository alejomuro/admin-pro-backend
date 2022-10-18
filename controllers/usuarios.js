//importamos la response para verificar si el usuario existe
const {response}=require('express')
const  bcrypt =require('bcryptjs')
//importamos el modelo se recomienda colocar la primera en mayuscula
//const usuario = require('../models/usuario');
const Usuario=require('../models/usuario');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, res)=>{
    //para poder paginar resultados de busqueda VIDEO 129, lo transformamos en numero
    //si es NaN entonces que ponga un cero..cuando no se le pone el valor
    const desde=Number (req.query.desde)|| 0;
    console.log(desde);

//para obtener todos los usuarios....{} es un filtro y los campos que quieran
//para la paginacion el SKIP que se salte los registros que estan antes del desde
//limit cuanto registros quiero desde la posicion anterior
//promise all es porque hay dos promesas dentro y se resuelven simultaneamente

const [usuarios, total]= await Promise.all([ 
    Usuario
            .find({},'nombre email role google img')
            .skip(desde)  
            .limit(5),
    Usuario.countDocuments()
]);
    
                                
//cuantos registros tengo en la base de datos
 

    res.json({
        ok:true,
        usuarios,
        total
    });
}
const crearUsuario = async(req, res=response)=>{
    const{email, password}=req.body;
   
//verificar si el usuario existe. importamos la response
    try {
     //verificar si existe el correo 
     const existeEmail=await Usuario.findOne({email});   

     if(existeEmail){
        return res.status(400).json({
            ok:false,
            msg:'el correo ya esta registrado'
        });
     }
        const usuario = new Usuario(req.body);

        //encriptar contraseña, se hace antes del save que es el que graba en la base de datos
        //SALT data generada de manera aleatoria
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        //guardar usuario
        await usuario.save();

          // generamos un token JWT
          const token = await generarJWT(usuario.id)
          

    res.json({
        ok:true,
        usuario,
        token
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error inesperado..revisar logs'
        });

    }

}

const actualizarUsuario= async(req, res=response)=>{
    //aqui obtengo el uid del usuario
    const uid = req.params.id;
    try {
        //el usuario lo necesito encontrar por el ID y le paso el uid
        const usuarioDB=await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario por ese ID'
            });
}
//actualizaciones
//password y google se extraen y no se actualizan
const {password, google,email, ...campos}= req.body;
if(usuarioDB.email !== email){
   
    const existeEmail = await usuario.findOne({email});
    if(existeEmail){
        res.status(400).json({
            ok:false,
            msg:'Ya existe un usuario con ese email'
        });
    }
}
campos.email=email;

//buscalo por el id y lo actualizas
//new true para indicarle que regrese el nuevo
const usuarioActualizado = await usuario.findByIdAndUpdate(uid , campos, {new:true});
        res.json({
            ok:true,
            usuario:usuarioActualizado

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

    const borrarUsuario =async(req, res=response)=>{
        const uid=req.params.id
        try {
        const usuarioDB=await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario por ese ID'
            });
            
            
}
await Usuario.findByIdAndDelete(uid)

        res.json({
            ok:true,
            msg:'usuario eliminado'
            
        })
            
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg:'hable con el administrador'
            });
        }

    }

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}