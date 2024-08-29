import { Schema, model } from "mongoose";

const AfiliadoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido."],
      minlength: [2, "El nombre debe tener al menos 2 caracteres."],
    },

    dni: {
      type: Number,
      required: [true, "El DNI es requerido."],
      minlength: [7, "El DNI debe tener al menos 7 dígitos."],
      maxlength: [8, "El DNI no debe tener más de 8 dígitos."],
      match: [/^[0-9]+$/, "El DNI solo debe contener números."],
      unique: true,
    },

    correo: {
      type: String,
      required: [true, "El correo es requerido."],
      unique: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Por favor, ingrese un correo electrónico válido.",
      ],
    },

    fechaNacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es requerida."],
    },

    domicilio: {
      type: String,
      required: [true, "El domicilio es requerido."],
      minlength: [2, "El domicilio debe tener al menos 5 caracteres."],
      maxlength: [50, "El domicilio no debe tener más de 50 caracteres."],
    },

    celular: {
      type: String,
      required: [true, "El celular es requerido."],
      minlength: [10, "El celular debe tener al menos 10 dígitos."],
      maxlength: [15, "El celular no debe tener más de 15 dígitos."],
      match: [/^[0-9]+$/, "El celular solo debe contener números."],
    },

    pais: {
      type: String,
      required: [true, "El país es requerido."],
    },

    provincia: {
      type: String,
      required: function () {
        return this.pais === "ar";
      },
      validate: {
        validator: function (v) {
          return this.pais !== "ar" || v;
        },
        message: "La provincia es requerida para Argentina.",
      },
    },

    departamento: {
      type: String,
      required: function () {
        return this.provincia === "Catamarca";
      },
      validate: {
        validator: function (v) {
          return this.provincia !== "Catamarca" || v;
        },
        message: "El departamento es requerido para la provincia de Catamarca.",
      },
    },
    
    firma: {
      type: String, // Ruta del archivo de firma en el servidor
      required: [true, "La firma es requerida."],
    },

    archivos: {
      type: [String], // Un arreglo de cadenas para almacenar múltiples rutas de archivos
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Debe subir al menos un archivo.",
      },
    },
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

export const Afiliado = model("Afiliado", AfiliadoSchema);
