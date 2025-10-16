const Message = require('../../models/v1/Message');


const getAll = async (req, res) => {
    let messages = await Message.find();//is eigenlijk een select * from messages
    res.json({
        status: "success",
        data: {
        messages: messages,
        },
    });
};

const getOne = (req, res) => {}

const create = (req, res) => {

    let text = req.body.message.text;
    let user = req.body.message.user;

    let message = new Message({ text: text, user: user });
    message.save().then(() => {
        res.json({
            status: "success",
            data: {
                message: message
            },
        });
    }).catch((error) => {
        res.json({
            status: "error",
            message: error.message
        });
    });
    
}

module.exports = { getAll, getOne, create };