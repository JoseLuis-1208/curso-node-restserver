import express from "express";
import cors from 'cors';
import router from '../routes/usuarios.js';
import { dbConnection } from "../database/config.js";
import { connect } from 'mongoose'

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

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

        this.app.use(this.usuariosPath, router);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });

    }


}


export default Server;
