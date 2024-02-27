import express from 'express';
import { InsertStudent, UpdateStudent, DeleteStudent, FetchStudentDetails,GetStudentDetailsInRow } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', InsertStudent);
router.put('/students/update', UpdateStudent);
router.delete('/students/delete', DeleteStudent);
router.get('/students/details', FetchStudentDetails);
router.get('/students/details/in_A_Row', GetStudentDetailsInRow);

export default router;
