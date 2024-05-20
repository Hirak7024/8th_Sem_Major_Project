import React, { useEffect, useState } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { toast } from 'react-toastify';
import "./Comments.scss";

export default function Comments({ showComments, setShowComments, Internship_ID }) {
    const { userData } = useAuth();
    const [comments, setComments] = useState([]);
    const [commentData, setCommentData] = useState({
        Internship_ID: null,
        Commentor_Name: userData.user.Name,
        Comment: "",
        Commentor_ID: userData.user.ID,
        Commentor_Email: userData.user.Email,
        Is_Reply: false
    })


    useEffect(() => {
        if (showComments) {
            fetchComments();
        }
    }, [showComments]);

    const fetchComments = async () => {
        try {
            const response = await Api.fetchCommentsByInternshipId(Internship_ID);
            setComments(response.data);
            console.log(comments);
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    };

    const handleCommentChange = (e) => {
        setCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleCommentSubmit = async (e, internshipId) => {
        e.preventDefault();

        try {
            const updatedCommentData = { ...commentData, Internship_ID: internshipId };
            const response = await Api.addComment(updatedCommentData);
            setCommentData(prev => ({ ...prev, Comment: "" })); // Clear the comment input
            toast.success(response.message);
            fetchComments();
        } catch (error) {
            toast.error('Error adding comment:', error);
        }
    };

    return (
        <div className='Comments_Main_Container'>
            <div className="Comments_Container">
                <button className="commentsCloseBtn" onClick={() => setShowComments(false)}>X</button>
                <div className="comments_Box">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div className={`Comment ${comment.Is_Reply ? 'flexEnd' : 'flexStart'}`} key={comment.id}>
                                <p className="Commentor_Name">{comment.Commentor_Name}</p>
                                <p className="Comment_Text">{comment.Comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments found</p>
                    )}
                </div>
                <div className="commentInputBox2">
                    <form className="commentForm2" onSubmit={(e) => handleCommentSubmit(e, Internship_ID)}>
                        <input type="text"
                            className='commentInput2'
                            value={commentData.Comment}
                            name='Comment'
                            onChange={handleCommentChange}
                        />
                        <button className="commentInsertBtn2" type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
