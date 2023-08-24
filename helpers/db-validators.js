import mongoose from "mongoose";
import Role from "../models/rol.js";
import Usuario from "../models/usuario.js"
import Categoria from "../models/categoria.js"
import Producto from "../models/producto.js";

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
};

const emailExiste = async (correo = '') => {
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
};


const existeUsuarioPorId = async (id) => {
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id:${id} no existe`);
    }
};

const existeCategoriaPorId = async(id)=>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new console.error(`El id no existe ${id}`);
    }
}
const existeProductoPorId = async(id)=>{
    // const existeProducto = await Producto.findById(id);
    const existeProducto = await Producto.findById(id);
  
    if(!existeProducto){
        throw new  Error(`El id: ${ id} no existe`);
    }
}

const coleccionesPermiridas = (coleccion='', colecciones=[])=>{

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
       throw new Error(`La coleccion ${coleccion} no es permitida ${colecciones}`) 
    }
    return true;
}
export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermiridas
}