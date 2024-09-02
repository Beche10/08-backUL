import { response, request } from "express";
import { Afiliado } from "../models/afiliado.js";

export const afiliadoGet = async (req = request, res = response) => {
  try {
    const afiliados = await Afiliado.find(); // Obtener todos los afiliados de la base de datos

    res.json({
      msg: "Afiliados de DB:",
      afiliados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los afiliados",
      error
    });
  }
};

export const afiliadoPost = async (req, res = response) => {
  const {
    nombre,
    dni,
    correo,
    fechaNacimiento,
    domicilio,
    celular,
    ocupacion,
    estadoCivil,
    pais,
    provincia,
    departamento,
    firma,
    fotoDni,
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
    ocupacion,
    estadoCivil,
    pais,
    provincia,
    departamento,
    firma,
    fotoDni,
  });

  // Guardar en DB
  await afiliado.save();

  res.status(201).json({
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
