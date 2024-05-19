import express from "express";
import { addComment, updateComment, getCommentsByInternshipId } from "../Controllers/Comments_Internships.js"

const router = express.Router();

router.post("/addComment", addComment);
router.put("/updateComment", updateComment);
router.get("/getCommentByInternshipId", getCommentsByInternshipId)

export default router;