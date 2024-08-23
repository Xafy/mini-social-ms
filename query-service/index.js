const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

posts = [];

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated':
            posts.push({ id: data.id, title: data.title });
            break;
        case 'CommentCreated':
            const post = posts.find(post => post.id === data.postId);
            post.comments = post.comments || [];
            post.comments.push({ id: data.id, content: data.content, status: data.status});
            break;
        case 'CommentUpdated':
            const updatedCommentPost = posts.find(post => post.id === data.postId);
            const comment = updatedCommentPost.comments.find(comment => comment.id === data.id);
            comment.status = data.status;
            break;
    }
}

app.get('/all-posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(3002,async () => {
    console.log('Listening on 3002');
    try {
        const res = await axios.get('http://localhost:4005/events');
        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    }    catch (e) {
        console.log('Error:', e);
    }
});