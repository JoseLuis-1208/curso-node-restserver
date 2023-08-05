import { Router } from "express";
import { usuariosDelet, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
const router = Router();


router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', usuariosPost);
router.delete('/',usuariosDelet);
router.patch('/', usuariosPatch);

export default router;