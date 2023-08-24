import { response } from 'express';
import fs from 'fs';
import path from 'path';

import { subirArchivo } from '../helpers/subir-archivo.js';
import Usuario from '../models/usuario.js';
import producto from '../models/producto.js';


const cargarArchivo = async (req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, 'img');
        res.json({ nombre })

    } catch (msg) {
        res.status(400).json({ msg });
    }
};

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })

    }

    const __dirname = path.resolve();
    //Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, 'uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();


    res.json(modelo);
}


const mostrarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })

    }

    const __dirname = path.resolve();
    //Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, 'uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
           return res.sendFile(pathImagen)
        }
    }
    const pathImagen = path.join(__dirname,'assets/no-image.jpg')
    res.sendFile(pathImagen);
 


    // res.json({msg:'falta el place holder'});


}



export {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}