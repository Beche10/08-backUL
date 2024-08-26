import express from "express";
import cors from "cors";
import { router } from "../routes/afiliado.js";
import { dbConnection } from "../database/config.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.afiliadosPath = "/api/afiliados";

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.afiliadosPath, router);
  }

  listen() {
    console.log("##########################");
    console.log("######## API REST ########");
    console.log("##########################");
    console.log(`http://localhost:${this.port}/`);
    this.app.listen(this.port);
  }
}
