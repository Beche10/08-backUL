import { response } from "express";
import { uploadFile } from "../helpers/uploadFile.js";
import { Usuario } from "../models/usuario.js";

export const uploads = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "El contenedor no tiene ningun archivo." });
    return;
  }

  // Imagenes
  const nombre = await uploadFile(req.files, undefined, "imgs");

  res.json({ nombre });
};

export const updateImage = async (req, res = response) => {
  const { id, coleccion } = req.params;

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

  const nombre = await uploadFile(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json({ modelo });
};
