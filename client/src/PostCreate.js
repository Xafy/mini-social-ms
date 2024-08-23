import React, {useState} from "react";

import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:3000/posts", {
            title
        });

        setTitle("");
    };

    return (
        <div>
            <form action="/posts" method="post"  onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PostCreate;
