import express from "express";
import { RegisterStudent, LoginStudent, updateStudentAuth, deleteStudentAuth } from "../Controllers/Student_Auth.js";

const router = express.Router();

router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);
router.put("/update", updateStudentAuth);
router.delete("/student/delete", deleteStudentAuth);

export default router;
