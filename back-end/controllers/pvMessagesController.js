const Users = require("../models/users");
const PrivateMessages = require("../models/privatemessages");

module.exports = {
    async create(req, res){
        try {
            const { cnpj, companyName } = req.body;
            const store = await PrivateMessages.create({ cnpj, companyName });

            return res.status(201).json({
                cnpj: store.cnpj, 
                companyName: store.companyName
                });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    },

    async findAll(req, res){
        try {
            const privatemessages = await PrivateMessages.findAll({ attributes: ["content", "userId", "friendShipId"] });
            return res.status(200).json(privatemessages);
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel listar as mensagens"});
        }
    },

    async findOne(req, res){
        try {
            const privatemessages = await PrivateMessages.findByPk(req.params.id, { attributes: ["content", "userId", "friendShipId"] });
            if (privatemessages){
                return res.status(200).json(privatemessages);
            }

            return res.status(404).json({message: "Mensagem não encontrada"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel encontrar as mensagens"});
        }
    },

    async update(req, res){
        try {

            const privatemessages = await PrivateMessages.findByPk(req.params.id, { attributes: ["content", "userId", "friendShipId"] });
            if (privatemessages){
                await privatemessages.update(req.body);
                return res.status(200).json(privatemessages);
            } 

            return res.status(404).json({message: "Mensagem não encontrada"});

        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Não foi possivel encontrar as mensagens"});
        }
    },

    async delete(req, res){
        try {
            const privatemessages = await PrivateMessages.findByPk(req.params.id, { attributes: ["content", "userId", "friendShipId"] });
            if (privatemessages){
                await privatemessages.destroy();
                return res.status(200).json({message: "Mensagem deletada com sucesso"});
            }

            return res.status(404).json({message: "Mensagem não encontrada"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel deletar as mensagens"});
        }
    }
}
