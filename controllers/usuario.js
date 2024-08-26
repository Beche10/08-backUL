import { response, request } from "express";
import { Usuario } from "../models/usuario.js";

export const usuarioGet = (req = request, res = response) => {
  res.json({
    msg: "get Usuario - controlador",
  });
};

export const usuarioPut = (req, res = response) => {
  res.json({
    msg: "put Usuario - controlador",
    id,
  });
};

export const usuarioPost = async (req, res = response) => {
  const { nombre, dni, correo, fechaNacimiento, domicilio, celular } = req.body;

  const usuario = new Usuario({
    nombre,
    dni,
    correo,
    fechaNacimiento,
    domicilio,
    celular,
  });

  // Guardar en DB
  await usuario.save();

  res.json({
    msg: "post Usuario - controlador",
    afiliado,
  });
};

export const usuarioDelete = (req, res = response) => {
  res.json({
    msg: "delete Usuario - controlador",
  });
};

export const usuarioPatch = (req, res = response) => {
  res.json({
    msg: "patch Afiliados - controlador",
  });
};
