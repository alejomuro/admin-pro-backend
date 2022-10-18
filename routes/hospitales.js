/*  hospitales
    ruta:'/api/hospitales'
*/
const { Router }=require('express');
const { check }=require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getHospitales, crearHospital, actualizarHospital, borrarHospital }=require('../controllers/hospitales')


const router=Router();

router.get('/', getHospitales);

//aqui usamos el middleware para la validacion de los diferentes campos, se manda como 2do argumento,
//y si son varios middleware se colocan entre corchetes como un arreglo.
//importamos el check de express validator
//mensaje personalizado para el error, se coloca en el check como 2do argumento
router.post('/', 
[
    validarJWT,
    check("nombre","el nombre del hospital es necesario").not().isEmpty(),
    validarCampos
], 
crearHospital);

router.put('/:id',
[]
,  actualizarHospital);

router.delete('/:id',
        borrarHospital
);

module.exports=router;