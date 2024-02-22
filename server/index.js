import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Student_Auth_Routes from "./Routes/student_auth.js";
import Students_Route from "./Routes/students.js";

dotenv.config();
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from Server");
})

app.use("/api/studentauth", Student_Auth_Routes);
app.use("/api/studentdetails", Students_Route);

app.listen(PORT, () => { console.log(`Server Connected to PORT ${PORT}`) });