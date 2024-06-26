import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Student_Auth_Routes from "./Routes/student_auth.js";
import Students_Route from "./Routes/students.js";
import Projects_Routes from "./Routes/projects.js";
import Internship_Routes from "./Routes/internships.js";
import Admin_Routes from "./Routes/admin.js";
import Need_Correction_Routes from "./Routes/need_correction.js";
import Comments_Internships_Route from "./Routes/comments_internships.js";
import Comments_Projects_Route from "./Routes/comments_projects.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
const PORT = 8001;

app.get("/", (req, res) => {
    res.send("Hello from Server");
})

app.use("/api/studentauth", Student_Auth_Routes);
app.use("/api/studentdetails", Students_Route);
app.use("/api/studentprojects", Projects_Routes);
app.use("/api/studentinternships", Internship_Routes);
app.use("/api/admin", Admin_Routes);
app.use("/api/needCorrection", Need_Correction_Routes);
app.use("/api/comments", Comments_Internships_Route);
app.use("/api/comments/projects", Comments_Projects_Route);


app.listen(PORT, () => { console.log(`Server Connected to PORT ${PORT}`) });