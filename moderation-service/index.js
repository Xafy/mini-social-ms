const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  const { type, data } = event;
    console.log('Processing event:', type)
    console.log('Processing event:', data)
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        try {
            await axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentModerated',
                data: {
                    id: data.id,
                    postId: data.postId,
                    status,
                    content: data.content
                }
            });
        } catch (error) {
            console.log(error);
        }

    }


  res.send({ status: 'OK' });
});

app.listen(3003, () => {
    console.log('moderator service is running on port 3003');
    });