import { response, request } from "express";
import { Afiliado } from "../models/afiliado.js";

// Obtener todas las categorias
export const afiliadoGet = (req = request, res = response) => {
  res.json({
    msg: "get Afiliados - controlador",
  });
};

export const afiliadoPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put Afiliados - controlador",
    id,
  });
};

export const afiliadoPost = async (req, res = response) => {
  const {
    nombre,
    dni,
    correo,
    fechaNacimiento,
    domicilio,
    celular,
    pais,
    provincia,
    departamento,
    img,
    firma,
    archivos,
  } = req.body;

  const afiliado = new Afiliado({
    nombre,
    dni,
    correo,
    fechaNacimiento,
    domicilio,
    celular,
    pais,
    provincia,
    departamento,
    img,
    firma,
    archivos,
  });

  // Guardar en DB
  await afiliado.save();

  res.json({
    msg: "post Afiliados - controlador",
    afiliado,
  });
};

export const afiliadoDelete = (req, res = response) => {
  res.json({
    msg: "delete Afiliados - controlador",
  });
};

export const afiliadoPatch = (req, res = response) => {
  res.json({
    msg: "patch Afiliados - controlador",
  });
};
