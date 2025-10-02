const express = require('express')
const logger = require('./middleware/logger');
const app = express();
const port = 3000;

let messages = [
    "hello",
    "hi",
    "how are you?"
];

app.use("/messages", logger);
app.use(express.json());

app.get("/messages/:id", (req, res) => {
    let id = req.params.id;
    if (id >= messages.length) {
        res.json({
            "status" : "error",
            "message" : "message not found"
        });
    }
    else {
        res.json(messages[id]);
    }
});


app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    let message = req.body.message;
    messages.push(message);
    res.send('POST /messages')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})