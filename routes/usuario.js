import { Router } from "express";
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.js";

export const router = Router();

router.get("/", usuarioGet );

router.put("/:id", usuarioPut );

router.post("/", usuarioPost );

router.delete("/", usuarioDelete );

router.patch("/", usuarioPatch );
