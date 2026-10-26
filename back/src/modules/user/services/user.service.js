
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Role from "../../role/models/role.model.js";

// -- Servicio Registro Usuario --
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

// -- Servicio Consulta Usuario por correo --
const getUserByEmail = async (correo) => {
  return await User.findOne({ correo }).select("-contrasena");
};

// -- Servicio Consulta Usuario por ID --
const getUserById = async (id) => {
  return await User.findById(id).select("-contrasena");
};

// -- Servicio Consultar todos los usuarios --
const listUser = async () => {
  return await User.find().select("-contrasena");
};

// -- Servicio Actualizar Usuario --
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

// -- Servicio Eliminar Usuario --
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
