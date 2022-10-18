const fs=require('fs');
const path = require('path');
const {response}=require('express');
const {v4: uuidv4}=require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload= (req, res=response)=>{
    const tipo=req.params.tipo;
    const id  =req.params.id;
    //validar el tipo
    const tiposValidos=['hospitales','medicos','usuarios'];
    //si incluye el tipo
    if(!tiposValidos.includes(tipo)){
       return res.status(400).json({
            ok:false,
            msg:'no es un medico, usuario u hospital (tipo)'
        })
    }
//para validar si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        });
      }

      //procesar la imagen...files.IMAGEN es el nombre que se le puso en postman body,formdata,key
      //tenemos acceso al files gracias a los midelware que establecimos en el routes
      const file = req.files.imagen;
      
      //extraer la extension del archivo. cortamos por el punto.
      const nombreCortado=file.name.split('.');//wolverin.1.2.jpg
      const extensionArchivo=nombreCortado[nombreCortado.length -1];

      //validar extension 
      const extensionesValidas=['png','jpg','jpeg','gif'];
      if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'no es una extension permitida'
        });
      }

      //generar el nombre del archivo, se instala el UUID
       const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;

       //PATH para guardar la imagen
       const path=`./uploads/${tipo}/${nombreArchivo}`;

       // Mover la imagen
     file.mv(path, (err)=> {
    if (err){
        return res.status(500).json({
            ok:false,
            msg:'error al mover la imagen'
        });
    }

    actualizarImagen(tipo,id,nombreArchivo);
      

   
    res.json({
        ok:true,
        msg:'archivo subido',
        nombreArchivo
    });
  });

}

const retornaImagen = (req, res=response)=>{
    //extraemos el tipo y la foto
    const tipo =req.params.tipo;
    const foto =req.params.foto;

    //necestitamos el path completo de donde esta la imagen, usuarios medicos y hospitales
    //importamos el path. sirve para construir un path completo
    //ubicacion donde se encuentra mi aplicacion desplegada __dirname, y la ruta donde se encuantra la imagen
    //para decirle a express que responda una imagen, no un json:res.sendfile(le mando el path)
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto, importamos el file system
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }


   


}

module.exports={
    fileUpload,
    retornaImagen
}