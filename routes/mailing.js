import { Router } from "express";
import { sendMailing } from "../controllers/mailing.js";

export const mailingRouter = Router();

// Ruta POST para enviar una consulta
mailingRouter.post("/", sendMailing);
