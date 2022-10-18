/*
    path: '/api/usuarios'
*/

const { Router }=require('express');
const { check }=require('express-validator')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }=require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router=Router();

router.get('/', validarJWT, getUsuarios);

//aqui usamos el middleware para la validacion de los diferentes campos, se manda como 2do argumento,
//y si son varios middleware se colocan entre corchetes como un arreglo.
//importamos el check de express validator
//mensaje personalizado para el error, se coloca en el check como 2do argumento
router.post('/', 
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    validarCampos
], 
crearUsuario);

router.put('/:id',validarJWT,
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('role','el role es obligatorio').not().isEmpty(),
    validarCampos
    
]
,  actualizarUsuario);

router.delete('/:id',validarJWT,
        borrarUsuario
);



module.exports=router;