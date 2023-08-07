import express from "express";
import cors from 'cors';
import  router  from '../routes/usuarios.js';

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT||3000;
        this.usuariosPath = '/api/usuarios';


        //Middlewares
        this.middleware();

        //rutas de acceso
        this.routes();
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
