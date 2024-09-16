import { Router } from 'express';
import { enviarConsulta } from '../controllers/contactController';


export const consultaRouter = Router();

// Ruta POST para enviar una consulta
consultaRouter.post('/', enviarConsulta);
