import express from "express";
import { insertIntoComments, updateCommentField } from "../Controllers/Comments.js";

const router = express.Router();

router.post("/insert", insertIntoComments);
router.put("/update", updateCommentField);

export default router;