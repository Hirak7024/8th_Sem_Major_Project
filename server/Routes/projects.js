import express from "express";
import { InsertProject, UpdateProject,DeleteProject } from "../Controllers/Projects.js";

const router = express.Router();

router.post("/project/insert", InsertProject);
router.put("/project/update", UpdateProject);
router.delete("/project/delete", DeleteProject);

export default router;