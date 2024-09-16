import { Schema, model } from "mongoose";

const ConsultaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    match: [/\S+@\S+\.\S+/, "El correo no es válido"],
  },
  mensaje: {
    type: String,
    required: [true, "El mensaje es obligatorio"],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

export const Consulta = model("Consulta", ConsultaSchema);
