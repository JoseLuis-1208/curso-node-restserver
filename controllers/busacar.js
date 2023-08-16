import { json, response } from "express";
import { Types } from "mongoose";

import Usuario from "../models/usuario.js"
import Product from "../models/producto.js"
import usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";
import Role from "../models/rol.js";



const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuario = async (termino = '', res = response) => {
    // Aquí defines una función llamada buscarUsuario que 
    // toma un término de búsqueda (termino) y una respuesta (res) como parámetros. Verificas si el termino es un ID de MongoDB válido utilizando 
    // Types.ObjectId.isValid. Si es válido, usas el modelo Usuario para buscar un usuario por su ID y luego envías la respuesta JSON con el usuario encontrado.
    if (Types.ObjectId.isValid(termino)) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            //SI el usuario exite regreso un aarreglo con el usuario y si no un arreglo vacio, utilizando un ternalio
            result: (usuario) ? [usuario] : []
        });
    }
    //Expresion regular para que sea insensible a minusculas y mayusculas
    const regex = new RegExp(termino, 'i');
    //segundo video 
    const usuarios = await Usuario.find({
        //  or permite hacer las condiciones que quiera definir, en este caso El campo que concida con la exprecion regular y espesificamos que en el campo Estadoo debe ser true (usuario activo)
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        result: usuarios,

    })
}

const buscarcategoria = async (termino = '', res = response) => {
if (Types.ObjectId.isValid(termino)) {
    const categoria = await Categoria.findById(termino);
    return res.json({
        result: (categoria) ? [categoria]:[]
    });
}
    const regex = new RegExp(termino, 'i');

    const categoria = await Categoria.find({
        $or: [{nombre : regex}],
        $and: [{estado : true}]
    });
    res.json({
        result:categoria
    })
    
}

const buscarProductos = async (termino = '', res = response) => {
    if (Types.ObjectId.isValid(termino)) {
        const producto = await Producto.findById(termino);
        return res.json({
            result: (producto) ? [producto]:[]
        });
    }
        const regex = new RegExp(termino, 'i');
    
        const producto = await Producto.find({
            $or: [{nombre : regex},{precio: regex}],
            $and: [{estado : true}]
        });
        
        res.json({
            result:producto,
        })
        
    }
    const buscarRoles = async (termino = '', res = response) => {
       
        if (Types.ObjectId.isValid(termino)) {
            const rol = await Role.findById(termino);
            return res.json({
                result: (rol) ? [rol]:[]
            });
        }
            const regex = new RegExp(termino, 'i');
        
            const rol = await Role.find({
                $or: [{rol : regex}],
            });
            
            res.json({
                result:rol,
            })
            
        }






const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categoria':
            // Aquí puedes agregar la lógica para buscar categorías
            buscarcategoria(termino, res);

            break;
        case 'productos':
            // Aquí puedes agregar la lógica para buscar productos
            buscarProductos(termino, res);
            break;
        case 'roles':
            // Aquí puedes agregar la lógica para buscar roles
            buscarRoles(termino,res)
            break;
        default:
            // Lógica por defecto si no coincide ninguna colección
            break;
    }
}

export {
    buscar
};