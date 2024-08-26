import { response, request } from 'express';
import { Usuario } from '../models/usuario.js';
import bcryptjs from 'bcryptjs';

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
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol
  });


  // Verificar si el correo existe

  
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

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
