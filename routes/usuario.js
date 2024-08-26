import { Router } from "express";
import { check } from "express-validator";
import { handleValidate } from "../middlewares/handleValidate.js";
import {
  usuarioDelete,
  usuarioGet,
  usuarioPatch,
  usuarioPost,
  usuarioPut,
} from "../controllers/usuario.js";
import { Role } from "../models/role.js";

export const userRouter = Router();

userRouter.get("/", usuarioGet);

userRouter.put("/:id", usuarioPut);

userRouter.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check(
      "password",
      "El password debe tener al menos 6 carácateres."
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido.").isEmail(),
    //check("rol", "No es un rol válido.").isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB.`);
      }
    }),
    handleValidate,
  ],
  usuarioPost
);

userRouter.delete("/", usuarioDelete);

userRouter.patch("/", usuarioPatch);
