import Role from "../models/role.js";
import Usuario from "../models/usuario.js"
const esRoleValido = async (rol = '') => {
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


export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}