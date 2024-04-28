import express from "express";
import { insertIntoNeedCorrection, getAllNeedCorrection, deleteNeedCorrectionByStudentID } from "../Controllers/Need_Correction.js";

const router = express.Router();

router.post("/insert", insertIntoNeedCorrection);
router.get("/get/allValues", getAllNeedCorrection);
router.delete("/delete/row", deleteNeedCorrectionByStudentID);


export default router;