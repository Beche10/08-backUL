import { response, request } from "express";
import { Afiliado } from "../models/afiliado.js";

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
    firma,
    archivos,
  } = req.body;

  const afiliadoDB = await Afiliado.findOne({ dni });

  if (afiliadoDB) {
    return res.status(400).json({
      msg: `El usuario con dni: ${dni} ya se encuentra registrado.`,
    });
  }

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
