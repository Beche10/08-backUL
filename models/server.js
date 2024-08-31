import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import { afiliadoRouter } from "../routes/afiliado.js";
import { uploadRouter } from "../routes/uploads.js";
import { userRouter } from "../routes/usuario.js";
import { auth } from "../routes/auth.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.afiliadosPath = "/api/afiliados";
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.uploadsPath = "/api/uploads";

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
    // Ruta de Autenticacion
    this.app.use(this.authPath, auth);
    // Ruta de afiliados
    this.app.use(this.afiliadosPath, afiliadoRouter);
    // Ruta de usuarios
    this.app.use(this.usersPath, userRouter);
    // Ruta de uploads
    this.app.use(this.uploadsPath, uploadRouter);
  }

  listen() {
    console.log("##########################");
    console.log("######## API REST ########");
    console.log("##########################");
    console.log(`http://localhost:${this.port}/`);
    this.app.listen(this.port);
  }
}
