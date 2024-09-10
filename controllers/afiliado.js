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

    // Verificar si ya existe un afiliado con el DNI proporcionado
    const afiliadoDB = await Afiliado.findOne({ dni });
    if (afiliadoDB) {
      return res.status(400).json({
        msg: `El usuario con DNI: ${dni} ya se encuentra registrado.`,
      });
    }

     // Subir la foto del DNI a Cloudinary
     let fotoDniUrl = [];
     if (req.files && req.files.fotoDni) {
       const { tempFilePath: tempFileDni } = req.files.fotoDni;
       const { secure_url } = await cloudinary.uploader.upload(tempFileDni);
       fotoDniUrl = [secure_url]; // Guardar la URL de la foto subida a Cloudinary
     }

    /*
    // Subir la firma a Cloudinary
    const { tempFilePath: tempFileFirma } = req.files.firma;
    const { secure_url: firmaUrl } = await cloudinary.uploader.upload(
      tempFileFirma
    );
    */

    // Guardar nuevo afiliado con la firma (Base64) y fotos subidas
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
      firma, // Firma enviada directamente en Base64
      fotoDni: fotoDniUrl, // URL de la foto subida
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
