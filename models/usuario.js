import { Schema, model } from 'mongoose';

export const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },

    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    }

});
