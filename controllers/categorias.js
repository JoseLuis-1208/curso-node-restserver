import { request, response } from "express";
import Categoria from "../models/categoria.js";

const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categoria
    })
}

//obtenercategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');
    res.json(categoria);

}

//CrearCategoria 
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id

    }

    const categoria = new Categoria(data);

    //guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

//Actualizar categorias.
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estadp, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();

    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}
//Borrar categoria - Estado false.
const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    const usuarioAuntenticado = req.usuario;
    const { nombre, email, rol } = usuarioAuntenticado;


    res.json({
        categoriaBorrada,
        nombre, email, rol
    });



}

export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}