import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";


export const auth = Router();

auth.post('/login', login);
