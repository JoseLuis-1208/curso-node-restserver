import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middelwares/validar-campos.js";
import { actualizarImagen, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermiridas  } from "../helpers/db-validators.js";
import { validarArchivoSubir } from "../middelwares/validar-archivo.js";
import router from "./usuarios.js";

const routerUploads = Router();

routerUploads.post('/',validarArchivoSubir,cargarArchivo)

routerUploads.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermiridas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)


routerUploads.get('/:coleccion/:id',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermiridas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)





export default routerUploads;