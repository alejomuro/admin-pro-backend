const jwt=require('jsonwebtoken');

const validarJWT=(req, res, next)=>{
//leer e token
    const token= req.header('x-token');

//verificar el token en este punto
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion'
        });
    }
//verificar el JWT...pide el token que lo tengo del header y la key,comprueba si hace el match con la firma dle token
    try {
        const { uid }=jwt.verify(token, process.env.JWT_SECRET);
        //podemos establecer informacion en la request
        req.uid=uid;
        next();

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }


    
}

module.exports={
    validarJWT
}