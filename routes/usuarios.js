import { Router } from "express";
import {  usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { check } from "express-validator";
import {validarCampos}  from "../middelwares/validar-campos.js";
import {esRoleValido, emailExiste, existeUsuarioPorId }from "../helpers/db-validators.js";

const router = Router();


router.get('/', usuariosGet);


router.put('/:id',[ 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/',[
check('nombre', 'El nombre no es valido').not().isEmpty(),
check('password', 'El pasword debe de ser mas de 6 letras').isLength({min:6}),
check('correo', 'El correo no es valido').isEmail(),
check('correo', ).custom(emailExiste),

// check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom(esRoleValido),
validarCampos
] ,usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );


router.patch('/', usuariosPatch);

export default router;