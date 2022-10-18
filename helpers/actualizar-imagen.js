//con el fs file system podemos leer las carpetas y los archivos y trabajar con ellos
const fs =require('fs')
//consideramos los 3 modelos 
const Usuario =require('../models/usuario');
const Medico  =require('../models/medico');
const Hospital=require('../models/hospital');


const borrarImagen=(path)=>{
    
            // si exite el path viejo si tiene imagen hay que borrarla, borramos el path viejo
            if(fs.existsSync(path)){
                //se borra la imagen anterior
                fs.unlinkSync(path)
            }
}
//le pasamos los argumentos del archivo de upload los ponemos en el mismo orden
const actualizarImagen=async(tipo,id,nombreArchivo)=>{
    let pathViejo='';
    switch (tipo) {
        case 'medicos':
            const medico=await Medico.findById(id);
            if(!medico){
                console.log('no es un medico por el id');
                return false;
            }
            pathViejo=`./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            
            medico.img=nombreArchivo;
            await medico.save();
            return true;
            
        break;

        case 'hospitales':
            const hospital=await Hospital.findById(id);
            if(!hospital){
                console.log('no es un hospital por el id');
                return false;
            }
             pathViejo=`./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            
            hospital.img=nombreArchivo;
            await hospital.save();
            return true;
            
        break;

        case 'usuarios':
            const usuario=await Usuario.findById(id);
            if(!usuario){
                console.log('no es un usuario por el id');
                return false;
            }
             pathViejo=`./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            
            usuario.img=nombreArchivo;
            await usuario.save();
            return true;
            
        break;
    
    }
}

module.exports={
    actualizarImagen
}