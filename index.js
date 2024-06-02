const express = require('express');
const notifier = require('node-notifier');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 2000;

app.use(bodyParser.json());

// Endpoint to send a simple notification
app.post('/notify', (req, res) => {
  const { title, message, sound, wait } = req.body;

  notifier.notify({
    title: title || 'Notification',
    message: message || 'You have a new notification!',
    sound: sound || false,
    wait: wait || false
  }, (err, response, metadata) => {
    if (err) {
      console.error('Notification error:', err);
      return res.status(500).send({ error: 'Failed to send notification' });
    }
    res.send({ response, metadata });
  });
});

// Endpoint to send an advanced notification
app.post('/notify-advanced', (req, res) => {
  const { title, message, icon, sound, wait, actions, reply } = req.body;

  notifier.notify({
    title: title || 'Advanced Notification',
    message: message || 'This is an advanced notification.',
    icon: icon ? path.resolve(icon) : undefined,
    sound: sound || false,
    wait: wait || false,
    actions: actions || undefined,
    reply: reply || false
  }, (err, response, metadata) => {
    if (err) {
      console.error('Notification error:', err);
      return res.status(500).send({ error: 'Failed to send advanced notification' });
    }
    res.send({ response, metadata });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Notifier API listening at http://localhost:${port}`);
});