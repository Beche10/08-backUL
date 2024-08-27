import { Router } from "express";
import { check } from "express-validator";


export const auth = Router();

auth.post('/login');
