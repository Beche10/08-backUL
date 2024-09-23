import { Router } from "express";
import { enviarConsulta, obtenerConsultas } from "../controllers/contactController.js";

export const consultaRouter = Router();

// Ruta POST para enviar una consulta
consultaRouter.post("/", enviarConsulta);

// Ruta GET para enviar todas las consultas
consultaRouter.get("/", obtenerConsultas);
