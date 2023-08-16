import { Router, response } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middelwares/validar-campos.js";
import { validarJWT } from "../middelwares/validar-jwt.js";


import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from "../controllers/categorias.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";
import { esAdminRole, tieneRole } from "../middelwares/validar-roles.js";

const routerCat = Router();

//obtener todas las categorias - publico 
routerCat.get('/', obtenerCategorias);
//Obtener una categoria por id - publico 
routerCat.get('/:id',
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
    obtenerCategoria);

//Crear una categoria- privado - cualquier persona con un token valido 
routerCat.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquiera con token valido
routerCat.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);
//borrar categoria 
routerCat.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], borrarCategoria);

export default routerCat