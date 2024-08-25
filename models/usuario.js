import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido."],
    minlength: 2
  },

  dni: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 8,
    match: /^[0-9]+$/,
  },

  correo: {
    type: String,
    required: [true, "El correo es requerido."],
    unique: true,
  },
  
  fechaNacimiento: {
    type: Date,
    required: true,
  },

  domicilio: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  celular: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
    match: /^[0-9]+$/,
  },

  img: {
    type: String,
  },

  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"]
  },

 
});

export const Usuario = model('Usuario', UsuarioSchema);