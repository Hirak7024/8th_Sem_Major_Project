import express from 'express';
import { InsertStudent, UpdateStudent, DeleteStudent, checkStudentByEmail, fetchAllDetails } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', InsertStudent);
router.put('/students/update', UpdateStudent);
router.delete('/students/delete', DeleteStudent);
router.post("/getStudentDetails/byEmail", checkStudentByEmail);
router.post("/getAll/studentDetails/internshipAndProject", fetchAllDetails);

export default router;
