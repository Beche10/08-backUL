import { Router } from "express";
import { afiliadoGet, afiliadoPost } from "../controllers/afiliado.js";

export const afiliadoRouter = Router();

// Obtener todos los afiliados - Privado
afiliadoRouter.get("/", afiliadoGet);

// Obtener afiliados especificos - Privado
afiliadoRouter.get("/:id", (req, res) => {
  res.json("get - id");
});

// Crear afiliados - Publico
afiliadoRouter.post("/", afiliadoPost);

// Actualizar por ID - Admin
afiliadoRouter.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar un afiliado - Admin
afiliadoRouter.delete("/:id", (req, res) => {
  res.json("delete");
});
