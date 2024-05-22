import pool from "../DataBase.js";

// TO ADD A COMMENT
export const addCommentProject = async (req, res) => {
    const { Project_ID, Commentor_Name, Comment, Commentor_ID, Commentor_UserName, Is_Reply } = req.body;

    try {
        // Insert new comment
        const [result] = await pool.execute(
            'INSERT INTO comments_projects (Project_ID, Commentor_Name, Comment, Commentor_ID, Commentor_UserName, Is_Reply) VALUES (?, ?, ?, ?, ?, ?)',
            [Project_ID, Commentor_Name, Comment, Commentor_ID, Commentor_UserName, Is_Reply]
        );

        // Retrieve the newly inserted comment to get its id
        const insertedId = result.insertId;

        // Prepare response
        const newComment = { id: insertedId, Project_ID, Commentor_Name, Comment, Commentor_ID, Commentor_UserName, Is_Reply };

        res.status(200).json({ data: newComment, message: "Comment added successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// TO UPDATE INTO COMMENTS
export const updateCommentProject = async (req, res) => {
    const { id, ...updateFields } = req.body;

    try {
        // Check if the comment with the provided id exists
        const checkCommentQuery = `SELECT * FROM comments_projects WHERE id = ?`;
        const [existingComment] = await pool.query(checkCommentQuery, [id]);
        if (existingComment.length === 0) {
            return res.status(404).json({ message: "Comment not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update the comment
        let updateQuery = `UPDATE comments_projects SET `;
        const updateValues = [];
        Object.keys(updateFields).forEach(key => {
            updateQuery += `${key} = ?, `;
            updateValues.push(updateFields[key]);
        });

        // Remove the trailing comma and space from the query string
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ` WHERE id = ?`;
        updateValues.push(id);

        // Execute the update query
        await pool.query(updateQuery, updateValues);

        // Fetch the updated comment record
        const updatedCommentQuery = `SELECT * FROM comments_projects WHERE id = ?`;
        const [updatedComment] = await pool.query(updatedCommentQuery, [id]);

        res.status(200).json({ data: updatedComment[0], message: "Comment updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO FETCH COMMENTS BY Project_ID
export const getCommentsByProjectId = async (req, res) => {
    const { Project_ID } = req.body;

    try {
        // Check if Project_ID is provided
        if (!Project_ID) {
            return res.status(400).json({ message: "Project_ID is required", status_code: 400 });
        }

        // Query to fetch all comments with the given Project_ID
        const fetchCommentsQuery = `SELECT * FROM comments_projects WHERE Project_ID = ?`;
        const [comments] = await pool.query(fetchCommentsQuery, [Project_ID]);

        // Check if comments were found
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this Internship ID", status_code: 404 });
        }

        // Send the fetched comments as response
        res.status(200).json({ data: comments, message: "Comments fetched successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
