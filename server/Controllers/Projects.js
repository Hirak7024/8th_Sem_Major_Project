import pool from '../DataBase.js';

// INSERT INTO PROJECTS
export const InsertProject = async (req, res) => {
    const { Project_Roll_No, Project_Type, Project_Title, Project_Start_Date, Project_End_Date, Project_Organisation, Project_Guide_Name, Project_Guide_Designation, Project_Description, Project_Certificate_Link, Project_Report_Link } = req.body;

    try {
        // Check if the provided Roll No exists in the students table
        const checkRollNoQuery = `SELECT * FROM students WHERE Roll_No = ?`;
        const [existingStudent] = await pool.query(checkRollNoQuery, [Project_Roll_No]);
        if (existingStudent.length === 0) {
            return res.status(400).json({ message: "Student Roll No doesn't exist in table students", status_code: 400 });
        }

        // Insert new project
        const insertQuery = `INSERT INTO projects (Project_Roll_No, Project_Type, Project_Title, Project_Start_Date, Project_End_Date, Project_Organisation, Project_Guide_Name, Project_Guide_Designation, Project_Description, Project_Certificate_Link, Project_Report_Link) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(insertQuery, [Project_Roll_No, Project_Type, Project_Title, Project_Start_Date, Project_End_Date, Project_Organisation, Project_Guide_Name, Project_Guide_Designation, Project_Description, Project_Certificate_Link, Project_Report_Link]);

        res.status(200).json({ message: "Project inserted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PROJECTS
export const UpdateProject = async (req, res) => {
    const { Project_ID, ...updateFields } = req.body;

    try {
        // Check if the project with the provided Project_ID exists
        const checkProjectQuery = `SELECT * FROM projects WHERE Project_ID = ?`;
        const [existingProject] = await pool.query(checkProjectQuery, [Project_ID]);
        if (existingProject.length === 0) {
            return res.status(404).json({ message: "Project not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update the project
        let updateQuery = `UPDATE projects SET `;
        const updateValues = [];
        Object.keys(updateFields).forEach(key => {
            updateQuery += `${key} = ?, `;
            updateValues.push(updateFields[key]);
        });
        // Remove the trailing comma and space from the query string
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ` WHERE Project_ID = ?`;
        updateValues.push(Project_ID);

        // Execute the update query
        await pool.query(updateQuery, updateValues);

        // Fetch the updated project record
        const updatedProjectQuery = `SELECT * FROM projects WHERE Project_ID = ?`;
        const [updatedProject] = await pool.query(updatedProjectQuery, [Project_ID]);

        res.status(200).json({ data: updatedProject[0], message: "Project updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//DELETE A PROJECT
export const DeleteProject = async (req, res) => {
    const { Project_ID } = req.body;

    try {
        // Check if the project with the provided Project_ID exists
        const checkProjectQuery = `SELECT * FROM projects WHERE Project_ID = ?`;
        const [existingProject] = await pool.query(checkProjectQuery, [Project_ID]);
        if (existingProject.length === 0) {
            return res.status(404).json({ message: "Project not found", status_code: 404 });
        }

        // Delete the project record
        const deleteQuery = `DELETE FROM projects WHERE Project_ID = ?`;
        await pool.query(deleteQuery, [Project_ID]);

        res.status(200).json({ message: "Project deleted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FETCH ALL PROJECTS DETAILS BY ROLL NO
export const fetchProjectsByRollNo = async (req, res) => {
    try {
        const { Roll_No } = req.body;

        // Query to fetch all project details of the student using Roll_No
        const [rows, fields] = await pool.execute('SELECT * FROM projects WHERE Project_Roll_No = ?', [Roll_No]);

        // Check if any projects were found
        if (rows.length > 0) {
            // Projects found, return all details
            const projects = rows;
            return res.status(200).json(projects);
        } else {
            // No projects found for the student
            return res.status(404).json({ message: 'No project details found for the student' });
        }
    } catch (error) {
        console.error('Error fetching projects by Roll_No:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// FETCH PROJECT DETAILS OF A PARTICULAR PROJECT USING PROJECT_ID
export const fetchProjectDetailsById = async (req, res) => {
    try {
        const { Project_ID } = req.body;

        // Query to check if the project exists
        const [projectRows, _] = await pool.execute('SELECT * FROM projects WHERE Project_ID = ?', [Project_ID]);

        // Check if any project was found
        if (projectRows.length === 0) {
            // Project not found
            return res.status(404).json({ message: 'Project details not found' });
        }

        // Project found, fetch details
        const [rows, fields] = await pool.execute('SELECT * FROM projects WHERE Project_ID = ?', [Project_ID]);
        const project = rows[0];

        return res.status(200).json(project);

    } catch (error) {
        console.error('Error fetching project details by Project_ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};






