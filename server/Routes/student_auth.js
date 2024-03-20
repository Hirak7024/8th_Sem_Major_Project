import express from "express";
import { RegisterStudent, LoginStudent, UpdateStudentAuth, DeleteStudentAuth,GetPayloadFromToken } from "../Controllers/Student_Auth.js";

const router = express.Router();

router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);
router.put("/update", UpdateStudentAuth);
router.delete("/student/delete", DeleteStudentAuth);
router.get("/getDecode/TokenPayload", GetPayloadFromToken);

export default router;
