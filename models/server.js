import express from "express";
import cors from 'cors';
import { connect } from 'mongoose'

import { dbConnection } from "../database/config.js";

import routerAuth from "../routes/auth.js";
import router from '../routes/usuarios.js';
import routerCat from "../routes/categorias.js";
import routerProducto from "../routes/productos.js";
import routerbuscar from "../routes/buscar.js";

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths={
            auth: '/api/auth',
            buscar:'/api/buscar',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios'
        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';



        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middleware();

        //rutas de acceso
        this.routes();
    }

    //TODO, conexiones a base de datos
    async conectarDB() {
        await dbConnection();
    }


    middleware() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Direcctorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.buscar, routerbuscar);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.categorias, routerCat);
        this.app.use(this.paths.productos, routerProducto);




    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });

    }


}


export default Server;
