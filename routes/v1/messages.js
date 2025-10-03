const express = require('express');
const router = express.Router();


let messages = [
    "Hello",
    "Hi"
];

let users = [
    "John",
    "Janne"
];

router.get('/', (req, res) => {
    // Create messages array using the arrays defined above
    const messageData = messages.map((message, index) => ({
        "user": users[index] || "Unknown", 
        "message": message
    }));

    res.json({
        "status": "success",
        "data": {
            messages: messageData
        },
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
        //res.json(messages[id]);
        res.json({
            "status": "success",
            "message": "GETTING message: " + messages[id],
            "data": {
                "user": user[id],
                "message": messages[id]
            }

        })
        

    }
});

router.post('/', (req, res) => {
    let message = req.body.message;
    messages.push(message);
    res.send('POST /messages')
});

module.exports = router;