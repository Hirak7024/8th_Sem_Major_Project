import express from "express";
import { RegisterAdmin, LoginAdmin, UpdateAdminPassword } from "../Controllers/Admin.js";

const router = express.Router();

router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.put("/updatePassword", UpdateAdminPassword)

export default router;