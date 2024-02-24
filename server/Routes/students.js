import express from 'express';
import { insertStudent,updateStudent,deleteStudent } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', insertStudent);
router.put('/students/update', updateStudent);
router.delete('/students/delete', deleteStudent);
// router.get('/students/:Roll_No', getStudentByRollNo);

export default router;
