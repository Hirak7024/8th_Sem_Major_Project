import express from "express";
import { RegisterStudent, LoginStudent } from "../Controllers/Student_Auth.js";

const router = express.Router();

router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);

export default router;
