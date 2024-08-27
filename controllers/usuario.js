import { response, request } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";

export const usuarioGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

export const usuarioPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO valida contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

export const usuarioPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

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

export const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  res.json({
    id,
  });
};

export const usuarioPatch = (req, res = response) => {
  res.json({
    msg: "patch Afiliados - controlador",
  });
};
