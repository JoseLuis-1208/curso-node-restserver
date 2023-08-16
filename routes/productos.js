//

import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middelwares/validar-campos.js";
import { validarJWT } from "../middelwares/validar-jwt.js";

import { actualizarProducto, borrarProducto, crearProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.js";
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole,tieneRole } from "../middelwares/validar-roles.js";

//

//
const routerProducto = Router();

//obtener todas las categorias - publico 
routerProducto.get('/', obtenerProductos);
//Obtener una categoria por id - publico 
routerProducto.get('/:id',
    check('id', 'No es un id de Mongo valido').isMongoId(),
     check('id').custom(existeProductoPorId),
    validarCampos,
    obtenerProducto);

//Crear una categoria- privado - cualquier persona con un token valido 
routerProducto.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de -mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar - privado - cualquiera con token valido
routerProducto.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);
//borrar categoria 
routerProducto.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto);

export default routerProducto
