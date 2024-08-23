import React from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
    const [content, setContent] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log("postId", postId);

        await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
            content
        });

        setContent("");
    };

    return (
        <div>
            <form method="post"  onSubmit={onSubmit}>
                <div className="mb-3 form-group">
                    <label htmlFor="content" className="form-label">Comment</label>
                    <input type="text" className="form-control" id="content" name="content"
                    value={content}
                    onChange={e => setContent(e.target.value)} 
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CommentCreate;