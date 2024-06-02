// File: index.js

const express = require('express');
const notifier = require('node-notifier');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/notify', (req, res) => {
    const { title, message, icon, sound, wait } = req.body;

    if (!title || !message) {
        return res.status(400).send({ error: 'Title and message are required' });
    }

    notifier.notify({
        title: title,
        message: message,
        icon: icon || path.join(__dirname, 'icon.png'), // optional icon
        sound: sound || true,  // optional sound
        wait: wait || false,   // wait with callback until user action is taken on notification
    }, (err, response) => {
        if (err) {
            return res.status(500).send({ error: 'Notification error', details: err });
        }
        res.send({ success: true, response: response });
    });
});

app.listen(port, () => {
    console.log(`Notifier API listening at http://localhost:${port}`);
});