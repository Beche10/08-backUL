import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";

export const isRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la DB.`);
  }
};

export const emailExist = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado.`);
  }
};

export const isUserById = async (id) => {
  // Verificar si el id existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ${id}, no existe.`);
  }
};

/* VALIDAR COLLECIONES PERMITIDAS */
export const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}.`
    )}

    return true;
};
