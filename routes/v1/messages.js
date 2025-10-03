const express = require('express');
const router = express.Router();


let messages = [
    "hello",
    "hi"
];

let users = [
    "John",
    "Jane"
];

router.get('/', (req, res) => {
    // combineer users en messages in één array van objecten
    let combined = messages.map((msg, i) => ({
        user: users[i] || "Unknown",  // fallback als er geen user is
        message: msg
    }));

    res.json({
        "status": "success",
        "message": "GETTING messages",
        "data": {
            "messages": combined
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
        res.json(users[id]);
        
        

    }
});

router.post('/', (req, res) => {
    let message = req.body.message;
    messages.push(message);
    res.send('POST /messages')
});

module.exports = router;