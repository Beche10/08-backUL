import { response } from "express";
import os from "os";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { Afiliado } from "../models/afiliado.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const afiliadoGet = async (req = request, res = response) => {
  try {
    const afiliados = await Afiliado.find(); // Obtener todos los afiliados de la base de datos
    const numAfiliados = await Afiliado.countDocuments();

    res.json({
      msg: "Afiliados de DB:",
      afiliados,
      numAfiliados,
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
    // Verificar el contenido recibido
    console.log("Cuerpo de la solicitud:", req.body);
    console.log("Archivos recibidos:", req.files);

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
      firma, // Firma en Base64
    } = req.body;

    // Verificar si ya existe un afiliado con el DNI proporcionado
    const afiliadoDB = await Afiliado.findOne({ dni });
    if (afiliadoDB) {
      return res.status(400).json({
        msg: `El usuario con DNI: ${dni} ya se encuentra registrado.`,
      });
    }

    // Subir las fotos del DNI a Cloudinary (si se proporcionan)
    let fotosDniUrls = [];
    if (req.files) {
      // Procesar las claves que empiezan con 'fotoDni'
      for (const key in req.files) {
        if (key.startsWith("fotoDni")) {
          const file = req.files[key];
          // Si se usa fileUpload, cada 'file' es un objeto de archivo
          const { tempFilePath } = file;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          fotosDniUrls.push(secure_url);
        }
      }
    }

    // Manejo de la firma en base64
    let firmaUrl = "";
    if (firma && firma !== "null") {
      // Verificar que la firma no sea null o vacía
      try {
        // Ruta temporal para guardar la firma
        const tempDir = os.tmpdir(); // Ruta del directorio temporal del sistema
        const tempFirmaPath = path.join(tempDir, `firma-${Date.now()}.png`); // Nombre de archivo único

        // Convertir la firma base64 a imagen y guardarla en la ruta temporal
        const base64Data = firma.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(tempFirmaPath, base64Data, "base64");

        // Subir la imagen temporal a Cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFirmaPath);
        firmaUrl = secure_url;

        // Eliminar el archivo temporal después de la carga
        fs.unlink(tempFirmaPath, (err) => {
          if (err) {
            console.error("Error al eliminar archivo temporal:", err);
          } else {
            console.log("Archivo temporal eliminado correctamente");
          }
        });
      } catch (err) {
        console.error("Error al procesar la firma base64:", err);
        return res.status(400).json({
          msg: "Firma no válida, por favor intenta nuevamente.",
        });
      }
    } else {
      console.log("No se recibió firma válida.");
    }

    // Guardar nuevo afiliado con la firma y fotos subidas
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
      firma: firmaUrl, // URL de la firma subida
      fotosDni: fotosDniUrls, // URLs de las fotos del DNI subidas
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
