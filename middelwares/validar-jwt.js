import { request, response } from "express";
import Jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js";

const validarJWT = async (req = request, res = response, netx) => {

  const token = req.header('x-token');


  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }

  try {
    const { uid } = Jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg:'token no valido - usuario No existe en la DB'
      })
    }
    //Verificar si el uid tiene estado en true  
    if (!usuario.estado) {
      return res.status(401).json({
        msg:'token no valido - usuario con estado false'
      })
    }


    req.usuario = usuario;
    netx();

  } catch (error) {

    console.log(error);
    res.status(401).json({
      msg: 'Token no VALIDO'
    })

  }
}

export {
  validarJWT
}