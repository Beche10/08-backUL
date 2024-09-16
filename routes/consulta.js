import { Router } from 'express';
import { enviarConsulta } from '../controllers/contactController.js';



export const consultaRouter = Router();

// Ruta POST para enviar una consulta
consultaRouter.post('/', enviarConsulta);
