import { Router } from "express";
import { afiliadoDelete, afiliadoGet, afiliadoPatch, afiliadoPost, afiliadoPut } from "../controllers/afiliado.js";

export const afiliadoRouter = Router();

afiliadoRouter.get("/", afiliadoGet );

afiliadoRouter.put("/:id", afiliadoPut );

afiliadoRouter.post("/", afiliadoPost );

afiliadoRouter.delete("/", afiliadoDelete );

afiliadoRouter.patch("/", afiliadoPatch );
