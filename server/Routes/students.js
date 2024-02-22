import express from 'express';
import { insertStudent } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', insertStudent);
// router.put('/students/:Roll_No', updateStudent);
// router.delete('/students/:Roll_No', deleteStudent);
// router.get('/students/:Roll_No', getStudentByRollNo);

export default router;
