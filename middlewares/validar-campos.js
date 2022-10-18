//este middleware es parecido a un controlador, va a tener el req y el res y otro argumento NEXT
const { response }=require('express')
const { validationResult }=require('express-validator')

const validarCampos=(req, res=response, next)=>{
    //validacion adicional, despues de los errores del middleware que tenemos a disponibilidad y los atrapamos
    //de la siguiente manera...impotamos el validationResult.
    //al pasar por el middleware dle check, crea en la REQ un arreglo de los errores generados en los check
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }
    //si cae aqui es porque no hay errores y que continue con el siguiente middleware
    next();
}

//necesitamos exportarlo para que sea utilizado en toda la aplicacion
//y lo utilizamos en la ruta, y lo colocamos despues de los check 
module.exports={
    validarCampos
}