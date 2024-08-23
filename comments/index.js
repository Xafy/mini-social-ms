const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');
const axios = require('axios'); // Add missing import statement for axios package

const app = express(); 

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [

];

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId.find(comment => comment.postId === req.params.id) || { comments: [] };
    res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const content = req.body.content;

    let post = commentsByPostId.find(comment => comment.postId === req.params.id);
    if (!post) {
        post = { postId: req.params.id, comments: [] };
        commentsByPostId.push(post);
    }
    post.comments.push({ id: commentId, content: content, status: 'pending'});
    console.log("created comment: ", post);

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(post);
});

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);

    if (req.body.type === 'CommentModerated') {
        const { postId, id, status, content } = req.body.data;
        console.log("received moderation event: ", req.body)
        console.log("all posts: ", commentsByPostId);
        const postComments = commentsByPostId.find(comment => comment.postId === postId);
        const comment = postComments.comments.find(comment => comment.id === id);
        comment.status = status;

        axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }

    res.send({});
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});