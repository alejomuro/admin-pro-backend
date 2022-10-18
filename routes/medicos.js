/*  medicos
    ruta:'/api/medico'
*/
const { Router }=require('express');
const { check }=require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getMedicos, crearMedico, actualizarMedico, borrarMedico }=require('../controllers/medicos')


const router=Router();

router.get('/', getMedicos);

//aqui usamos el middleware para la validacion de los diferentes campos, se manda como 2do argumento,
//y si son varios middleware se colocan entre corchetes como un arreglo.
//importamos el check de express validator
//mensaje personalizado para el error, se coloca en el check como 2do argumento
router.post('/', 
[
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hostpital id deber ser valido').isMongoId(),
    validarCampos
], 
crearMedico);

router.put('/:id',
[],  actualizarMedico);

router.delete('/:id',
    borrarMedico);

module.exports=router;