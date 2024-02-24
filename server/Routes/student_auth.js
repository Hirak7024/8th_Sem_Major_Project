import express from "express";
import { RegisterStudent, LoginStudent, UpdateStudentAuth, DeleteStudentAuth } from "../Controllers/Student_Auth.js";

const router = express.Router();

router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);
router.put("/update", UpdateStudentAuth);
router.delete("/student/delete", DeleteStudentAuth);

export default router;
