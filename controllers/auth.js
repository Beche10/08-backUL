import { response, request } from "express";

export const login = (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    res.json({
      msg: "Login OK",
      correo,
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "ERROR: Hable con el administrador.",
    });
  }
};
