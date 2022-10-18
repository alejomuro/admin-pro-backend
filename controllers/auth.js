const { response}=require('express');
const  bcrypt =require('bcryptjs')
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




const login = async(req, res= response)=>{
    const {email,password}=req.body;
    try {
        //encontrarlo por el email...y si no se encuentra por el email hasta ahi llega el proceso
        //verificar email
        const usuarioDB=await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'email no encontrado'
            });
        }

        //verificar contraseña(tengo la contraseña encriptada y la contraseña que se acaba de escribir)
        //compareSync para comparar las contraseñas(el password que la persona acaba de escribir,la contraseña que esta en la DB)
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'contraseña no valida'
            });
        }
        //si llega hasta este punto generamos un token JWT
        const token= await generarJWT(usuarioDB.id)


        res.json({
            ok:true,
            msg:token
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}
//se coloca como objeto porque mas adelante se puede agregar otro controlador
module.exports={
    login
};