const bcrypt = require('bcrypt');
const Sellers = require("../models/seller");
const Stores = require("../models/store");
const validator = require('../helpers/validation');
const { signAccessToken } = require('../middleware/validateAccessToken');

module.exports = {
    async create(req, res){
        let [check, msg] = await validator.sellerRegisterValidation(req.body);

        if (check){

            try {
                const storeCnpj = await Stores.findByPk(req.body.storeCnpj, { attributes: ["cnpj"] });

                if (!storeCnpj){
                    return res.status(404).json({ message: "Loja não encontrada" });
                }

                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                const seller = await Sellers.create(req.body);
                seller.password = undefined;
                req.role = 'seller';

                return res.status(201).json({
                    cpf: seller.cpf,
                    storeCnpjs: seller.storeCnpjs,
                    firstname: seller.firstname, 
                    lastname: seller.lastname, 
                    accessToken: signAccessToken({ sellerId: seller.sellerId, role: req.role }),
                    // refreshToken: await refreshToken({ cpf: seller.cpf })
                    });
            } catch (err) {
                console.log(err);
                return res.status(400).json({ message: msg });
            }

        }

        return res.status(404).json({message: msg});
    },

    async findAll(req, res){
        try {
            const sellers = await Sellers.findAll();
            return res.status(200).json(sellers);
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel listar os administradores"});
        }
    },

    async findOne(req, res){
        try {
            const sellers = await Sellers.findByPk(req.params.cpf);
            if (sellers){
                return res.status(200).json(sellers);
            }

            return res.status(404).json({message: "Fiscal não encontrado"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel encontrar o fiscal"});
        }
    },

    async update(req, res){
        try {

            const sellers = await Sellers.findByPk(req.params.cpf);
            if (sellers){
                await sellers.update(req.body);
                return res.status(200).json(sellers);
            } 

            return res.status(404).json({message: "Fiscal não encontrado"});

        } catch (err) {
            return res.status(500).json({message: "Não foi possivel encontrar o fiscal"});
        }
    },

    async delete(req, res){
        try {
            const sellers = await Sellers.findByPk(req.params.cpf);
            if (sellers){
                await sellers.destroy();
                return res.status(200).json({message: "Fiscal deletado com sucesso"});
            }

            return res.status(404).json({message: "Fiscal não encontrado"});
        } catch (err) {
            return res.status(500).json({message: "Não foi possivel deletar o fiscal"});
        }
    }
}
