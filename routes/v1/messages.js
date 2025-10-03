const express = require('express');
const router = express.Router();


let messages = [
    "hello",
    "hi",
    "how are you?"
];

let users = [
    "John",
    "Jane",
    "Doe"
];

router.get('/', (req, res) => {
    res.json({
        "status": "success",
        "data": {
            messages: messages,
            users: users
        }
    });
});


router.get("/:id", (req, res) => {
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

router.post('/', (req, res) => {
    let message = req.body.message;
    messages.push(message);
    res.send('POST /messages')
});

module.exports = router;