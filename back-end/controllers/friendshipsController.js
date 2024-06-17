const Friendships = require("../models/friendships");
const { Op } = require("sequelize");

module.exports = {
    async create(req, res){
        try {
            const { userId, friendId } = req.body;
            const friendship = await Friendships.create({ userId, friendId });

            return res.status(201).json({
                friendship
                });
        } catch (err) {
            return res.status(400).json({ message: err });
        }

    },

    async findAll(req, res){
        try {
            const friendships = await Friendships.findAll();
            return res.status(200).json(friendships);
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: "Cannot get friendships"});
        }
    },

    async findOne(req, res){
        try {
            const friendship = await Friendships.findByPk(req.params.id);
            if (friendship){
                return res.status(200).json(friendship);
            }

            return res.status(404).json({message: "Friendship not found"});
        } catch (err) {
            return res.status(500).json({message: "Cannot find friendship"});
        }
    },

    async update(req, res){
        try {

            const friendship = await Friendships.findByPk(req.params.id);
            if (friendship){
                await friendship.update(req.body);
                return res.status(200).json(friendship);
            } 

            return res.status(404).json({message: "Friendship not found"});

        } catch (err) {
            return res.status(500).json({message: "Cannot find friendship"});
        }
    },

    async delete(req, res){
        try {
            const friendship = await Friendships.findByPk(req.params.id);
            if (friendship){
                friendship.destroy();
                return res.status(200).json(friendship);
            }

            return res.status(404).json({message: "Friendship not found"});
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Cannot delete friendship"});
        }
    },

    async findAllFriendshipsUser(req, res){
        try {
            const friendship = await Friendships.findAll({where: {[Op.or]: [{userId: req.params.id}, {friendId: req.params.id}]}});
            if (friendship){
                return res.status(200).json(friendship);
            }

            return res.status(404).json({message: "Friendship not found"});
        } catch (err) {
            return res.status(500).json({message: "Cannot find all friendships of an user"});
        }
    }
}
