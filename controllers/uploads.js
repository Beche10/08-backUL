import { response } from "express";



export const uploads = (req, res = response) => {
 

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "El contenedor no tiene ningun archivo." });
    return;
  }

  
};
