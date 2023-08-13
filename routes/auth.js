import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middelwares/validar-campos.js";
import {googleSingIn, login}  from "../controllers/auth.js";

const routerAuth = Router();

routerAuth.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

routerAuth.post('/google',[
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
    
], googleSingIn);




export default routerAuth;