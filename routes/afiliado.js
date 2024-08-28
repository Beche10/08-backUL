import { Router } from "express";

export const afiliadoRouter = Router();

// Obtener todos los afiliados - Privado
afiliadoRouter.get("/", () => {
  res.json("get");
});

// Obtener afiliados especificos - Privado
afiliadoRouter.get("/:id", () => {
  res.json("get - id");
});

// Crear afiliados - Publico
afiliadoRouter.post("/", () => {
  res.json("post");
});

// Actualizar por ID - Admin
afiliadoRouter.put("/:id", () => {
  res.json("put");
});

// Borrar un afiliado - Admin
afiliadoRouter.delete("/:id", () => {
    res.json("put");
  });
