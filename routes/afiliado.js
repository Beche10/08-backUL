import { Router } from "express";

export const afiliadoRouter = Router();

// Obtener todos los afiliados - Privado
afiliadoRouter.get("/", (req, res) => {
  res.json("get");
});

// Obtener afiliados especificos - Privado
afiliadoRouter.get("/:id", (req, res) => {
  res.json("get - id");
});

// Crear afiliados - Publico
afiliadoRouter.post("/", (req, res) => {
  res.json("post");
});

// Actualizar por ID - Admin
afiliadoRouter.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar un afiliado - Admin
afiliadoRouter.delete("/:id", (req, res) => {
  res.json("delete");
});
