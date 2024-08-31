import { Router } from "express";
import { check } from "express-validator";
import { handleValidate } from "../middlewares/handleValidate.js";
import { updateImage, uploads } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/dbValidators.js";

export const uploadRouter = Router();

uploadRouter.post("/", uploads);
uploadRouter.put("/:coleccion/:id", [
   check('id', 'El id debe ser de mongo').isMongoId(),
   check('coleccion').custom( c => coleccionesPermitidas(c, ['users','afiliados']) ),
   handleValidate
], updateImage);
