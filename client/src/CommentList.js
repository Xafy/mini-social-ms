import React, { useState } from "react";
// import axios from "axios";

const CommentList = ({postId, comments }) => {
    return (
        <div>
            <ul className="list-group">
                {comments.map(comment => {
                    if (comment.status === "rejected") 
                        comment.content = "This comment has been rejected";
                    if (comment.status === "pending") 
                        comment.content = "This comment is awaiting moderation";
                    return <li key={comment.id} className="list-group-item">{comment.content}</li>;
                })}
            </ul>
        </div>
    );
};

export default CommentList;