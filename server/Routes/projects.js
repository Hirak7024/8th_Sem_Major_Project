import express from "express";
import multer from "multer";
import path from "path";
import { pool2 } from "../DataBase.js";
import { InsertProject, UpdateProject, DeleteProject, fetchProjectsByRollNo, fetchProjectDetailsById } from "../Controllers/Projects.js";

const router = express.Router();

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/pdfs/projects");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadPdf = multer({ storage: pdfStorage }).fields([
    { name: "Project_Certificate" },
    { name: "Project_Report" }
]);

router.post("/project/insert", InsertProject);
router.put("/project/update", UpdateProject);
router.delete("/project/delete", DeleteProject);
router.post("/project/fetchAll/detailsofProjects", fetchProjectsByRollNo);
router.post("/project/fetch/detailsofProject/byID", fetchProjectDetailsById);

router.post("/upload/pdf/certificateAndReport/forProject", (req, res) => {
    uploadPdf(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Failed to upload PDF files" });
        }

        const { Project_ID } = req.body;

        if (!Project_ID) {
            return res.status(400).json({ Message: "Project_ID is missing" });
        }

        try {
            const Certificate = req.files["Project_Certificate"][0].filename;
            const Report = req.files["Project_Report"][0].filename;

            const sql = "UPDATE projects SET Project_Certificate_Link = ?, Project_Report_Link = ? WHERE Project_ID = ?";
            pool2.query(sql, [Certificate, Report, Project_ID], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ Message: "Failed to update project with PDF files" });
                }else{
                    return res.status(200).json({ Status: "Success" });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ Message: "Internal server error" });
        }
    });
});


export default router;