import express from 'express';
import { InsertStudent, UpdateStudent, DeleteStudent } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', InsertStudent);
router.put('/students/update', UpdateStudent);
router.delete('/students/delete', DeleteStudent);
// router.get('/students/:Roll_No', getStudentByRollNo);

export default router;
