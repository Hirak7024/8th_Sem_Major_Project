import express from 'express';
import { InsertStudent, UpdateStudent, DeleteStudent, FetchStudentDetails, GetStudentDetailsInRow, FetchAllStudentsDetailsPerBatch, checkStudentByEmail } from "../Controllers/Students.js";

const router = express.Router();

router.post('/students/insert', InsertStudent);
router.put('/students/update', UpdateStudent);
router.delete('/students/delete', DeleteStudent);
router.get('/students/details', FetchStudentDetails);
router.get('/students/details/in_A_Row', GetStudentDetailsInRow);
router.get('/students/details/fetch/perBatch', FetchAllStudentsDetailsPerBatch);
router.post("/getStudentDetails/byEmail", checkStudentByEmail);

export default router;
