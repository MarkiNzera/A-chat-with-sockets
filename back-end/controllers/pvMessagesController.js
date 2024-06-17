const Users = require("../models/users");
const PrivateMessages = require("../models/privatemessages");

module.exports = {
    async create(req, res){
        try {
            const { content, friendshipId, userId } = req.body;
            const pvmessage = await PrivateMessages.create({ content, friendshipId, userId });

            return res.status(201).json({
                pvmessage
                });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    },

    async findAll(req, res){
        try {
            const privatemessages = await PrivateMessages.findAll();
            return res.status(200).json(privatemessages);
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Cannot get messages"});
        }
    },

    async findOne(req, res){
        try {
            const privatemessages = await PrivateMessages.findByPk(req.params.id);
            if (privatemessages){
                return res.status(200).json(privatemessages);
            }

            return res.status(404).json({message: "Message not found"});
        } catch (err) {
            return res.status(500).json({message: "Cannot find message"});
        }
    },

    async update(req, res){
        try {

            const privatemessages = await PrivateMessages.findByPk(req.params.id);
            if (privatemessages){
                await privatemessages.update(req.body);
                return res.status(200).json(privatemessages);
            } 

            return res.status(404).json({message: "Message not found"});

        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Cannot find message"});
        }
    },

    async delete(req, res){
        try {
            const privatemessages = await PrivateMessages.findByPk(req.params.id);
            if (privatemessages){
                await privatemessages.destroy();
                return res.status(200).json(privatemessages);
            }

            return res.status(404).json({message: "Message not found"});
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: "Cannot delete message"});
        }
    }
}
