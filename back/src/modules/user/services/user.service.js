
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Role from "../../role/models/role.model.js";

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ correo: userData.correo });

  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  const role = await Role.findOne({ nombreRol: "Cliente" });

  if (!role) {
    throw new Error("No existe el rol Cliente");
  }

  const contrasena = await bcrypt.hash(userData.contrasena, 10);

  const user = await User.create({
    nombre: userData.nombre,
    apellido: userData.apellido,
    correo: userData.correo,
    contrasena,
    telefono: userData.telefono,
    direccion: userData.direccion,
    idRol: role._id,
  });

  return user;
};

const getUserByEmail = async (correo) => {
  return await User.findOne({ correo }).select("-contrasena");
};

const getUserById = async (id) => {
  return await User.findById(id).select("-contrasena");
};

const listUser = async () => {
  return await User.find().select("-contrasena");
};

const updateUser = async (id, userData) => {
  const updateData = {
    nombre: userData.nombre,
    apellido: userData.apellido,
    correo: userData.correo,
    telefono: userData.telefono,
    direccion: userData.direccion,
    estadoUsuario: userData.estadoUsuario,
  };

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) delete updateData[key];
  });

  if (userData.contrasena) {
    updateData.contrasena = await bcrypt.hash(userData.contrasena, 10);
  }

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-contrasena");
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id).select("-contrasena");
};

export default {
  registerUser,
  getUserByEmail,
  getUserById,
  listUser,
  updateUser,
  deleteUser,
};
