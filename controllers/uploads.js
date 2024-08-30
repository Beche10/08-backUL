import { response } from "express";

export const uploads = (req, res = response) => {
  res.json({
    msg: "Soy el archivo subido",
  });
};
