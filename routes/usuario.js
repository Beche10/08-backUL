import { Router } from "express";
import { check } from "express-validator";
import { handleValidate } from "../middlewares/handleValidate.js";
import {
  emailExist,
  isRoleValid,
  isUserById,
} from "../helpers/dbValidators.js";
import {
  usuarioDelete,
  usuarioGet,
  usuarioPatch,
  usuarioPost,
  usuarioPut,
} from "../controllers/usuario.js";

export const userRouter = Router();

userRouter.get("/", usuarioGet);

userRouter.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(isUserById),
    check("rol").custom(isRoleValid),
    handleValidate,
  ],
  usuarioPut
);

userRouter.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check(
      "password",
      "El password debe tener al menos 6 carácateres."
    ).isLength({ min: 6 }),
    check("correo").custom(emailExist),
    check("rol").custom(isRoleValid),
    handleValidate,
  ],
  usuarioPost
);

userRouter.delete("/", usuarioDelete);

userRouter.patch("/", usuarioPatch);
