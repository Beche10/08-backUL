import { Router } from "express";
import { afiliadosDelete, afiliadosGet, afiliadosPatch, afiliadosPost, afiliadosPut } from "../controllers/usuarios.js";

export const router = Router();

router.get("/", afiliadosGet );

router.put("/:id", afiliadosPut );

router.post("/", afiliadosPost);

router.delete("/", afiliadosDelete );

router.patch("/", afiliadosPatch);
