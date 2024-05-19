import pool from "../DataBase.js";

// TO ADD A COMMENT
export const addComment = async (req, res) => {
    const { Internship_ID, Commentor_Name, Comment, Reply, Replier_Name } = req.body;

    try {
        // Build the base query and values array
        let query = 'INSERT INTO comments_internships (';
        const values = [];
        const columns = [];
        const placeholders = [];

        // Add each field if it is present in the request body
        if (Internship_ID !== undefined) {
            columns.push('Internship_ID');
            values.push(Internship_ID);
            placeholders.push('?');
        }
        if (Commentor_Name !== undefined) {
            columns.push('Commentor_Name');
            values.push(Commentor_Name);
            placeholders.push('?');
        }
        if (Comment !== undefined) {
            columns.push('Comment');
            values.push(Comment);
            placeholders.push('?');
        }
        if (Reply !== undefined) {
            columns.push('Reply');
            values.push(Reply);
            placeholders.push('?');
        }
        if (Replier_Name !== undefined) {
            columns.push('Replier_Name');
            values.push(Replier_Name);
            placeholders.push('?');
        }

        // Combine columns and placeholders into the query
        query += columns.join(', ') + ') VALUES (' + placeholders.join(', ') + ')';

        // Execute the query with the values
        const [result] = await pool.execute(query, values);

        // Retrieve the newly inserted comment's ID
        const insertedId = result.insertId;

        // Prepare response with inserted data
        const newComment = { id: insertedId, Internship_ID, Commentor_Name, Comment, Reply, Replier_Name };

        res.status(200).json({ data: newComment, message: "Comment added successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// TO UPDATE INTO COMMENTS
export const updateComment = async (req, res) => {
    const { id, ...updateFields } = req.body;

    try {
        // Check if the comment with the provided id exists
        const checkCommentQuery = `SELECT * FROM comments_internships WHERE id = ?`;
        const [existingComment] = await pool.query(checkCommentQuery, [id]);
        if (existingComment.length === 0) {
            return res.status(404).json({ message: "Comment not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update the comment
        let updateQuery = `UPDATE comments_internships SET `;
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
        const updatedCommentQuery = `SELECT * FROM comments_internships WHERE id = ?`;
        const [updatedComment] = await pool.query(updatedCommentQuery, [id]);

        res.status(200).json({ data: updatedComment[0], message: "Comment updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO FETCH COMMENTS BY INTERNSHIP_ID
export const getCommentsByInternshipId = async (req, res) => {
    const { Internship_ID } = req.body;

    try {
        // Check if Internship_ID is provided
        if (!Internship_ID) {
            return res.status(400).json({ message: "Internship_ID is required", status_code: 400 });
        }

        // Query to fetch all comments with the given Internship_ID
        const fetchCommentsQuery = `SELECT * FROM comments_internships WHERE Internship_ID = ?`;
        const [comments] = await pool.query(fetchCommentsQuery, [Internship_ID]);

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
