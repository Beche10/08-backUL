import { response, request } from "express";
import { Usuario } from "../models/usuario";



export const usuariosGet = (req = request, res = response) => {

  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: "get Afiliados - controlador",
    q,
    nombre,
    apiKey
  });
};

export const usuariosPut = (req, res = response) => {
 
  const { id }  = req.params.id;
 
  res.json({
    msg: "put Afiliados - controlador",
    id
  });
};

export const usuariosPost = (req, res = response) => {
 
  const body = req.body; 
 
  res.json({
    msg: "post Afiliados - controlador",
    body
  });
};

export const usuariosDelete = (req, res = response) => {
    res.json({
      msg: "delete Afiliados - controlador",
    });
  };

  export const usuariosPatch = (req, res = response) => {
    res.json({
      msg: "patch Afiliados - controlador",
    });
  };