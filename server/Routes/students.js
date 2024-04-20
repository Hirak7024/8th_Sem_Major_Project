import express from 'express';
import multer from "multer";
import path from "path";
import pool from "../DataBase.js"
import { pool2 } from '../DataBase.js';
import { InsertStudent, UpdateStudent, DeleteStudent, checkStudentByEmail, fetchAllDetails } from "../Controllers/Students.js";

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const uploadImage = multer({ storage: imageStorage }).single("image");

router.post('/students/insert', InsertStudent);
router.put('/students/update', UpdateStudent);
router.delete('/students/delete', DeleteStudent);
router.post("/getStudentDetails/byEmail", checkStudentByEmail);
router.post("/getAll/studentDetails/internshipAndProject", fetchAllDetails);

router.post("/upload/profilePicture", (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            console.error("Image upload error:", err);
            return res.status(500).json({ message: "Error uploading image" });
        }
        const { Student_ID } = req.body; 
        const image = req.file.filename;
        const sql = "UPDATE students SET ProfilePicture = ? WHERE Student_ID = ?";
        pool2.query(sql, [image, Student_ID], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Error updating image in database" });
            }
            return res.status(200).json({ status: "Success", message:"Profile Picture Updated Successfully" });
        });
    });
});

export default router;
