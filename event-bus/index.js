const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    try {
        await axios.post('http://posts-cluster-ip-srv:3000/events', event); // posts event to posts service
        await axios.post('http://comments-cluster-ip-srv:3001/events', event); // posts event to comments service
        await axios.post('http://query-cluster-ip-srv:3002/events', event); // posts event to query service
        await axios.post('http://moderation-cluster-ip-srv:3003/events', event); // posts event to moderation service

        console.log('Event sent to all services');
    } catch (error) {
        console.log("errrrr", JSON.stringify(error));
    }
    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event bus listening on 4005');
});