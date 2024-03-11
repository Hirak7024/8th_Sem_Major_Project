import express from "express";
import { InsertInternship, UpdateInternship, DeleteInternship, fetchInternshipsByRollNo, fetchInternshipDetailsById } from "../Controllers/Internships.js";

const router = express.Router();

router.post("/internship/insert", InsertInternship);
router.put("/internship/update", UpdateInternship);
router.delete("/internship/delete", DeleteInternship);
router.post("/internship/fetchAll/detailsofInternships", fetchInternshipsByRollNo);
router.post("/internship/fetch/detailsofInternship/byID", fetchInternshipDetailsById);

export default router;