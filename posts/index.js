const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const { default: axios } = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [

];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts.push({id, title});

    axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: { id, title }
    });

    res.status(201).json(posts);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(3000, () => {
    console.log("updated")
    console.log('Server is running on http://localhost:3000');
}); 