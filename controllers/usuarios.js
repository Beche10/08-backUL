import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import { Usuario } from "../models/usuario.js";


export const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: "get Afiliados - controlador",
    q,
    nombre,
    apiKey,
  });
};

export const usuariosPut = (req, res = response) => {
  const { id } = req.params.id;

  res.json({
    msg: "put Afiliados - controlador",
    id,
  });
};

export const usuariosPost = async (req, res = response) => {
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
  const usuario = new Usuario({
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

  // Verificar si el correo existe
      

  // Encriptar contraseña


  // Guardar en DB
  await usuario.save();

  res.json({
    msg: "post Afiliados - controlador",
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
};

export const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete Afiliados - controlador",
  });
};

export const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch Afiliados - controlador",
  });
};
