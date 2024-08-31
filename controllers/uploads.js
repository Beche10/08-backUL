import { response } from "express";
import path from "path";
import { fileURLToPath } from "url"; // Necesario para calcular __dirname
import { v4 as uuidv4 } from 'uuid';


export const uploads = (req, res = response) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "El contenedor no tiene ningun archivo." });
    return;
  }

  const { archivo } = req.files;
  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  // Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg"];
  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extension ${extension} no es permitida, ${extension}`,
    });
  }

  const nombreTemp = uuidv4() + '.' + extension;
  const uploadPath = path.join( __dirname, "../uploads/", nombreTemp );

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to" + uploadPath });
  });
};
