
import userService from "../services/user.service.js";

// -- Controlador Registro Usuario --
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, telefono, direccion } = req.body;

    if (!nombre || !apellido || !correo || !contrasena || !telefono || !direccion) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    const user = await userService.registerUser(req.body);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    const status = error.message.includes("correo ya está registrado")
      ? 409
      : error.message.includes("No existe el rol Cliente")
        ? 400
        : error.name === "ValidationError"
          ? 400
          : 500;

    return res.status(status).json({ mensaje: error.message });
  }
};

// -- Controlador Consulta Usuario por correo --
const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.correo);
  
    if (!user) {
      return res.status(404).json({
         mensaje: "Usuario no encontrado",
      });
    }
  
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al consultar el usuario por correo",
    });
  }
};

// -- Controlador Consulta Usuario por ID --
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ mensaje: "ID de usuario inválido" });
  }
};

// -- Controlador Consultar todos los usuarios --
const listUser = async (req, res) => {
  try {
    const users = await userService.listUser();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al consultar los usuarios" });
  }
};

// -- Controlador Actualizar Usuario --
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    const status = error.code === 11000 ? 409
      : error.name === "ValidationError" ? 400
      : 500;

    return res.status(status).json({ mensaje: error.message });
  }
};

// -- Controlador Eliminar Usuario --
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return res.status(400).json({ mensaje: "No se pudo eliminar el usuario" });
  }
};

export default {
  registerUser,
  getUserByEmail,
  getUserById,
  listUser,
  updateUser,
  deleteUser,
};
