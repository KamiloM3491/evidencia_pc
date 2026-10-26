
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  estadoUsuario: { type: String, default: "Activo" },
  idRol: { type: Schema.Types.ObjectId, ref: "Roles", required: true },
});

const User = model("Usuarios", userSchema, "usuarios");

export default User;
