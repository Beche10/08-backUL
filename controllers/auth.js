import { response, request } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import { generateJWT } from "../helpers/generateJWT.js";

export const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {

    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if( !usuario ) {
        return res.status(400).json({
            msg: "Usuario / Password no son correctos."
        })
    }

    // SI el usuario está activo 
    if( !usuario.estado ) {
        return res.status(400).json({
            msg: "Usuario / Password no son correctos."
        })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password )
    if(!validPassword) {
        return res.status(400).json({
            msg: "Usuario / Password no son correctos."
        })
    }

    // Generar el JWT
    const token = await generateJWT( usuario.id );


    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "ERROR: Hable con el administrador.",
    });
  }
};
