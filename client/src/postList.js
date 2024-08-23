import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await axios.get("http://localhost:3002/all-posts");
        console.log("response", response.data);
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {posts.map(post => (
                <div key={post.id} className="card" style={{ width: "30%", marginBottom: "20px" }}>
                    <div className="card-body">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                    {Array.isArray(post.comments) && post.comments.length > 0 ? (
                        <>
                            <CommentList postId={post.id} comments={post.comments} />
                            <hr/>
                        </>
                    ) : null}
                    <CommentCreate postId={post.id} />
                </div>
            ))}
        </div>
    );
}

export default PostList;