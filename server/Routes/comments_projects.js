import express from "express";
import { addCommentProject, updateCommentProject, getCommentsByProjectId } from "../Controllers/Comments_Projects.js"

const router = express.Router();

router.post("/addComment", addCommentProject);
router.put("/updateComment", updateCommentProject);
router.post("/getCommentByProjectId", getCommentsByProjectId)

export default router;