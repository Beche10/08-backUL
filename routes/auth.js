import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.js";
import { handleValidate } from "../middlewares/handleValidate.js";


export const auth = Router();

auth.post('/login', [
    check('correo', 'El correo es obligatorio.').isEmail(),
    handleValidate
], login);
