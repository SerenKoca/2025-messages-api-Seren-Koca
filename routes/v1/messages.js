const express = require('express');
const router = express.Router();


let messages = [
    "hello",
    "hi",
    "how are you?"
];

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

router.get('/', (req, res) => {
    res.json({
        "status": "success",
        "data": {
            messages: [
                {
                    "user": "John",
                    "message": "Hello"
                },
                {
                    "user": "Jane",
                    "message": "Hi"
                }
            ]
       },
    });
});

router.post('/', (req, res) => {
    let message = req.body.message;
    messages.push(message);
    res.send('POST /messages')
});

module.exports = router;