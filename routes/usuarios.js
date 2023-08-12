import { Router } from "express";
import { check } from "express-validator";

//todo: Midelwares
// import { validarCampos } from "../middelwares/validar-campos.js";
// import { validarJWT } from "../middelwares/validar-jwt.js";
// import { esAdminRole, tieneRole } from "../middelwares/validar-roles.js";
import { validarCampos,
    validarJWT, 
    esAdminRole, 
    tieneRole 
} from "../middelwares/index.js";

//TODO validaciones de base de datos
import { esRolValido, emailExiste, existeUsuarioPorId } from "../helpers/db-validators.js";
//todo Controladores de usuraios
import {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
} from "../controllers/usuarios.js";

const router = Router();


router.get('/', usuariosGet);


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El pasword debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo',).custom(emailExiste),

    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole, // FUERZA A QUE EL USUARIO SEA ADMINISTRADOR
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'), // En este te permite meter los roles y puede ser cualquier role que este en ese arreglo:3
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDelete);


router.patch('/', usuariosPatch);

export default router;