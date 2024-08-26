import { response, request } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

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
  const errors = validationResult(req);

  if( !errors.isEmpty() ) {
      return res.status(400).json(errors);
  }

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado.",
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({
    msg: "post Usuario - controlador",
    usuario,
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
