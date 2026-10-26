import roleService from "../services/role.service.js";

const listRole = async (req, res) => {
  try {
    const roles = await roleService.listRole();

    return res.status(200).json({ roles });
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
};

export default {
  listRole,
};