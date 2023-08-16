import { Router } from "express";
import { buscar } from "../controllers/busacar.js";

const routerbuscar = Router();
routerbuscar.get('/:coleccion/:termino',buscar)




export default routerbuscar;