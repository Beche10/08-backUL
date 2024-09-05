import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import { response } from "express";
import { Afiliado } from "../models/afiliado.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const afiliadoGet = async (req = request, res = response) => {
  try {
    const afiliados = await Afiliado.find(); // Obtener todos los afiliados de la base de datos

    res.json({
      msg: "Afiliados de DB:",
      afiliados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los afiliados",
      error,
    });
  }
};

export const afiliadoGetById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const afiliado = await Afiliado.findById(id);

    if (!afiliado) {
      return res.status(404).json({
        msg: `No se encontró un afiliado con el ID: ${id}`,
      });
    }

    res.json({
      msg: "Afiliado encontrado:",
      afiliado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el afiliado",
      error,
    });
  }
};

export const afiliadoPost = async (req, res = response) => {
  try {
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
    } = req.body;

    
    // Verificar si el archivo ha sido enviado
    if (!req.files || !req.files.fotoDni.name) {
      return res.status(400).json({
        msg: "La foto del DNI es obligatoria.",
      });
    }

    // Verificar si ya existe un afiliado con el DNI proporcionado
    const afiliadoDB = await Afiliado.findOne({ dni });

    if (afiliadoDB) {
      return res.status(400).json({
        msg: `El usuario con DNI: ${dni} ya se encuentra registrado.`,
      });
    }

     // Subir la imagen del DNI a Cloudinary
     const { tempFilePath } = req.files.fotoDni;
     const { secure_url: fotoDniUrl } = await cloudinary.uploader.upload(
        tempFilePath
     );

    // Crear nuevo afiliado con la URL de la imagen subida
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
      //fotoDni: [fotoDniUrl],
    });

    // Guardar en la base de datos
    await afiliado.save();

    res.status(201).json({
      msg: "Afiliado creado exitosamente.",
      afiliado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al crear el afiliado.",
      error,
    });
  }
};
