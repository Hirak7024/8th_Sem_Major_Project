import express from "express";
import multer from "multer";
import path from "path";
import { pool2 } from "../DataBase.js";
import { InsertInternship, UpdateInternship, DeleteInternship, fetchInternshipsByRollNo, fetchInternshipDetailsById } from "../Controllers/Internships.js";

const router = express.Router();

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/pdfs/internships");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadPdf = multer({ storage: pdfStorage }).fields([
    { name: "Internship_Certificate" },
    { name: "Internship_Report" }
]);

router.post("/internship/insert", InsertInternship);
router.put("/internship/update", UpdateInternship);
router.delete("/internship/delete", DeleteInternship);
router.post("/internship/fetchAll/detailsofInternships", fetchInternshipsByRollNo);
router.post("/internship/fetch/detailsofInternship/byID", fetchInternshipDetailsById);

router.post("/upload/pdf/certificateAndReport/forInternship", (req, res) => {
    uploadPdf(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Failed to upload PDF files" });
        }

        const { Internship_ID } = req.body;

        if (!Internship_ID) {
            return res.status(400).json({ Message: "Internship_ID is missing" });
        }

        try {
            const Certificate = req.files["Internship_Certificate"][0].filename;
            const Report = req.files["Internship_Report"][0].filename;

            const sql = "UPDATE internships SET Internship_Certificate_Link = ?, Internship_Report_Link = ? WHERE Internship_ID = ?";
            pool2.query(sql, [Certificate, Report, Internship_ID], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ Message: "Failed to update internship with PDF files" });
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
