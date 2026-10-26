import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  nombreRol: { type: String, required: true },
});

export default model("Roles", roleSchema, "roles");