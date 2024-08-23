import { response, request } from "express";

export const afiliadosGet = (req = request, res = response) => {

  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: "get Afiliados - controlador",
    q,
    nombre,
    apiKey
  });
};

export const afiliadosPut = (req, res = response) => {
 
  const { id }  = req.params.id;
 
  res.json({
    msg: "put Afiliados - controlador",
    id
  });
};

export const afiliadosPost = (req, res = response) => {
 
  const body = req.body; 
 
  res.json({
    msg: "post Afiliados - controlador",
    body
  });
};

export const afiliadosDelete = (req, res = response) => {
    res.json({
      msg: "delete Afiliados - controlador",
    });
  };

  export const afiliadosPatch = (req, res = response) => {
    res.json({
      msg: "patch Afiliados - controlador",
    });
  };