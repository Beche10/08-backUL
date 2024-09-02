import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { response } from "express";
import { uploadFile } from "../helpers/uploadFile.js";
import { Usuario } from "../models/usuario.js";

// Subir imagen
export const uploads = async (req, res = response) => {
  // Imagenes
  const nombre = await uploadFile(req.files, undefined, "imgs");

  res.json({ nombre });
};

// Actualizar imagen
export const updateImage = async (req, res = response) => {
  const { id, coleccion } = req.params;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let modelo;

  switch (coleccion) {
    case "users":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}.`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImage = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const nombre = await uploadFile(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json({ modelo });
};
