import { request, response } from "express";
import Producto from "../models/producto.js";
import { body } from "express-validator";

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { disponible: true };

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        producto
    })
}

//obtenercategoria - populate {}
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);

}

//CrearCategoria 
const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body
     
    //agregué esto:
    const nombre = body.nombre.toUpperCase();
     
    //Cambie el findOne 
    const productoDB = await Producto.findOne({ nombre })

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id

    }
    const producto = new Producto(data);
    //guardar DB
    await producto.save();
    res.status(201).json(producto);


}

//Actualizar categorias.
const actualizarProducto = async (req, res = response) => {
    const {id} = req.params;
    const {estado, usuario,...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    
    data.usuario = req.usuario._id;

   const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
   
   res.json({
    producto
  
})
}
//Borrar categoria - Estado false.
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { disponible: false }, { new: true });
    res.json({
        productoBorrado
    });



}

export {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto

}