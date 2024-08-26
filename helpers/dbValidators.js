import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";

export const isRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la DB.`);
  }
};

export const emailExist = async ( correo = "" ) => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado.",
    });
  }
};
