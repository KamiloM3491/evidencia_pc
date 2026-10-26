
import express from "express";
import user from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", user.registerUser);
router.get("/list", user.listUser);
router.get("/email/:correo", user.getUserByEmail);
router.get("/:id", user.getUserById);
router.patch("/update/:id", user.updateUser);
router.delete("/delete/:id", user.deleteUser);

export default router;
