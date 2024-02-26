import express from "express";
import { InsertInternship, UpdateInternship, DeleteInternship } from "../Controllers/Internships.js";

const router = express.Router();

router.post("/internship/insert", InsertInternship);
router.put("/internship/update", UpdateInternship);
router.delete("/internship/delete", DeleteInternship);

export default router;