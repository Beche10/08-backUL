import { Router } from "express";
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.js";

export const userRouter = Router();

userRouter.get("/", usuarioGet );

userRouter.put("/:id", usuarioPut );

userRouter.post("/", usuarioPost );

userRouter.delete("/", usuarioDelete );

userRouter.patch("/", usuarioPatch );
