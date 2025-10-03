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
     
        res.json({
            "status" : "success",
            "message" : "GETTING message " + id,
            "data": {
                "message": {
                    "message": messages[id],
                    "user": users[id]
                }

            }
        });
        

    }
});

router.post('/', (req, res) => {
    const messageData = req.body.message;

    // Check of de body correct is
    if (!messageData || typeof messageData.user !== 'string' || typeof messageData.text !== 'string') {
        return res.json({
            status: "error",
            message: "Invalid message format. Required: { message: { user: 'string', text: 'string' } }"
        });
    }

    // Genereer een unieke ID (24 karakters hex string zoals MongoDB ObjectId)
    const generateObjectId = () => {
        const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
        const randomBytes = Array(16)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
        return timestamp + randomBytes;
    };

    const uniqueId = generateObjectId();

    // Voeg de nieuwe message en user toe aan de arrays
    messages.push(messageData.text);
    users.push(messageData.user);

    // Maak het nieuwe bericht object
    const newMessage = {
        user: messageData.user,
        text: messageData.text,
        _id: uniqueId,
        __v: 0
    };

    res.json({
        status: "success",
        message: "Message saved",
        data: {
            message: newMessage
        }
    });
});

module.exports = router;