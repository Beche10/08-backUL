import path from "path";
import { response } from "express";

export const uploads = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "El contenedor no tiene ningun archivo." });
    return;
  }

  const { archivo } = req.files;

  const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: 'File uploaded to' + uploadPath });
  });
};
