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
    let messageData = req.body.message;
    
    if (!messageData || !messageData.user || !messageData.text) {
        return res.json({
            "status": "error",
            "message": "Invalid message format. Required: { message: { user: 'string', text: 'string' } }"
        });
    }
    
    // Voeg de nieuwe message en user toe aan de arrays
    messages.push(messageData.text);
    users.push(messageData.user);
    
    // Genereer een random ID (zoals in de gewenste output)
    let randomId = Math.random().toString(16).substring(2, 8) + 
                   Math.random().toString(16).substring(2, 8) + 
                   Math.random().toString(16).substring(2, 8) + 
                   Math.random().toString(16).substring(2, 2);
    
    // Maak het nieuwe bericht object volgens gewenste format
    let newMessage = {
        user: messageData.user,
        text: messageData.text,  // Let op: "text" niet "message"
        _id: randomId,
        __v: 0
    };
    
    res.json({
        "status": "success",
        "message": "Message saved",
        "data": {
            "message": newMessage
        }
    });
});

module.exports = router;