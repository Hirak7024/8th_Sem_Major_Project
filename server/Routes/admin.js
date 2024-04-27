import express from "express";
import { RegisterAdmin,LoginAdmin } from "../Controllers/Admin.js";

const router = express.Router();

router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);

export default router;