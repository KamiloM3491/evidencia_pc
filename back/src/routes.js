import express from "express";

import roles from "./modules/role/routes/role.route.js";
import user from "./modules/user/routes/user.route.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "Backend funcionando correctamente"
    });
});

router.use("/role", roles);
router.use("/user", user);

export default router;