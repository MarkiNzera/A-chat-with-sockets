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
            return res.status(500).json({message: err});
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
            return res.status(500).json({message: err});
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
            return res.status(500).json({message: err});
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
            return res.status(500).json({message: err});
        }
    },

    async findAllFromFriendship(req, res) {
        try {
            const privatemessages = await PrivateMessages.findAll({where: [{friendshipId: req.params.friendshipId}]})
            if (privatemessages){
                return res.status(200).json(privatemessages);
            }

            return res.status(404).json({message: "Messages not found"});
        } catch (err) {
            return res.status(500).json({message: err});
        }
    }
}
