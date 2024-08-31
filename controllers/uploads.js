import { response } from "express";

export const uploads = (req, res = response) => {
 
    console.log(req.files);
 
 
 
    res.json({
    msg: "Soy el archivo subido",
  });
};
