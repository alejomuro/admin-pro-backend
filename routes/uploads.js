/*
    ruta:api/uploads
*/

const {Router}=require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const router=Router();

const { validarJWT } = require('../middlewares/validar-jwt');
router.use(expressFileUpload())

//tipo es si es usuario, hospitales, medicos
router.put('/:tipo/:id',validarJWT , fileUpload);

//para obtener la imagen
router.get('/:tipo/:foto', retornaImagen)


module.exports=router;