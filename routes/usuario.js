import { Router } from "express";
import {
  usuarioDelete,
  usuarioGet,
  usuarioPatch,
  usuarioPost,
  usuarioPut,
} from "../controllers/usuario.js";
import { check } from "express-validator";

export const userRouter = Router();

userRouter.get("/", usuarioGet);

userRouter.put("/:id", usuarioPut);

userRouter.post("/",[
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password","El password debe tener al menos 6 carácateres.").isLength({ min: 6 }),
    check("correo", "El correo no es válido.").isEmail(),
  ],
  usuarioPost
);

userRouter.delete("/", usuarioDelete);

userRouter.patch("/", usuarioPatch);
