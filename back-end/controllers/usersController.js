const bcrypt = require('bcrypt');
const Users = require("../models/users");
const validator = require('../helpers/validation');
const { signAccessToken } = require('../middleware/validateAccessToken');

module.exports = {
    async create(req, res){
        let [check, msg] = await validator.registerValidation(req.body);

        if (check){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                const user = await Users.create(req.body);
                user.password = undefined;

                return res.status(201).json({
                    user,
                    accessToken: signAccessToken({ id: user.id })
                });

            } catch (err) {
                return res.status(500).json({ err: "Não foi possivel adicionar o usuario" });
            }
        } 

        return res.status(400).json({ error: msg });
    },

    async findAll(req, res){
        try {
            const users = await Users.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel listar os administradores"});
        }
    },

    async findOne(req, res){
        try {
            const users = await Users.findByPk(req.params.id);
            if (users){
                return res.status(200).json(users);
            }

            return res.status(404).json({message: "Usuario não encontrado"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel encontrar o usuario"});
        }
    },

    async update(req, res){
        try {

            const users = await Users.findByPk(req.params.id);
            if (users){
                await users.update(req.body);
                return res.status(200).json(users);
            } 

            return res.status(404).json({message: "Usuario não encontrado"});

        } catch (err) {
            return res.status(500).json({message: "Não foi possivel encontrar o usuario"});
        }
    },

    async delete(req, res){
        try {
            const users = await Users.findByPk(req.params.id);
            if (users){
                await users.destroy();
                return res.status(200).json({message: "Usuario deletado com sucesso"});
            }

            return res.status(404).json({message: "Usuario não encontrado"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel deletar o usuario"});
        }
    }
}
