const jwt =require('jsonwebtoken');


const generarJWT=(uid)=>{
    //transformamos esta funcion en una promesa
    return new Promise((resolve,reject) =>{
        const payload={
            uid,
        };
        
       // el sign es para crearlo, y creamos una variable de entorno para ponerla despues del payload
       //luego en el siguiente argumento es para la duracion del token y va entre llaves, y luego viene un callback,
       //ese callback retorna un error y 2do argumento es el token
       jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn:'24h'
       }, (err, token)=>{
            if(err){
                console.log(err);
                reject('no se pudo generar el JWT')
            }else{
                resolve(token);
            }
       });

    });
    

}
module.exports={
    generarJWT
}


//instalar JWT npm i jsonwebtoken