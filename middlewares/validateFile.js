import { response } from "express";

export const validateFile = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .json({ msg: "El contenedor no tiene ningun archivo." });
  }

  next();
};
