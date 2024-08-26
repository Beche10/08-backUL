import { Router } from "express";
import { afiliadoDelete, afiliadoGet, afiliadoPatch, afiliadoPost, afiliadoPut } from "../controllers/afiliado.js";

export const router = Router();

router.get("/", afiliadoGet );

router.put("/:id", afiliadoPut );

router.post("/", afiliadoPost );

router.delete("/", afiliadoDelete );

router.patch("/", afiliadoPatch );
