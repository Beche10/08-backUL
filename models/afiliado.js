import { Schema, model } from "mongoose";

const AfiliadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido."],
    minlength: 2,
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

  pais: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: function () {
      return this.pais === "ar";
    },
  },
  departamento: {
    type: String,
    required: function () {
      return this.provincia === "Catamarca";
    },
  },

  img: {
    type: String,
  },

  firma: {
    type: String, // Ruta del archivo de firma en el servidor
    required: true,
  },

  archivos: {
    type: [String], // Un arreglo de cadenas para almacenar múltiples rutas de archivos
  },
});

export const Afiliado = model("Afiliado", AfiliadoSchema);
