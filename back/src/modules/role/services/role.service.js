import Role from "../models/role.model.js";

const listRole = async () => {
  try {
    return await Role.find();
  } catch (error) {
    throw new Error("Error al consultar los roles");
  }
};

export default {
  listRole,
};