import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbConnection } from "../database/config.js";
import { afiliadoRouter } from "../routes/afiliado.js";
import { uploadRouter } from "../routes/uploads.js";
import { userRouter } from "../routes/usuario.js";
import { auth } from "../routes/auth.js";
import { consultaRouter } from "../routes/consulta.js";
import { exportToExcelRouter } from "../routes/export.js";


export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.afiliadosPath = "/api/afiliados";
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.uploadsPath = "/api/uploads";
    this.consultaPath = "/api/consultas"; // NUEVA RUTA
    this.exportToExcelPath = "/api/export"; // NUEVA RUTA
    

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
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Lectura y parseo del body con límite de tamaño aumentado
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ limit: "10mb", extended: true }));

    // Directorio publico
    this.app.use(express.static("public"));

    // File uploads - carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    // Ruta de autenticacion
    this.app.use(this.authPath, auth);
    // Ruta de afiliados
    this.app.use(this.afiliadosPath, afiliadoRouter);
    // Ruta de usuarios
    this.app.use(this.usersPath, userRouter);
    // Ruta de uploads
    this.app.use(this.uploadsPath, uploadRouter);
    // Ruta de consultas (Nueva)
    this.app.use(this.consultaPath, consultaRouter); // NUEVA RUTA
    // Ruta de export Excel (Nueva)
    this.app.use(this.exportToExcelPath, exportToExcelRouter); // NUEVA RUTA
  }

  listen() {
    console.log("##########################");
    console.log("######## API REST ########");
    console.log("##########################");
    console.log(`http://localhost:${this.port}/`);
    this.app.listen(this.port);
  }
}
