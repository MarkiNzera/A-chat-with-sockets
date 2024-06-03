require('dotenv').config();

const bcrypt = require('bcrypt');

const User = require("../models/User");
const validator = require("../helpers/validation");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../middleware/verifyJwtToken");


module.exports = {
    async login(req, res){
        let [check, msg, user] = await validator.loginValidation(req);
        if (check) {
            try {
                user.password = undefined;
                
                return res.status(201).json({
                    user,
                    accessToken: await signAccessToken({id: user.id}),
                    refreshToken: await signRefreshToken({id: user.id})
                });
            } catch (err) {
                return res.status(500).json({ err: "Não foi possivel fazer o login" });
            }
        }

        return res.status(400).json({ error: msg });
    },
    async register(req, res){
        let [check, msg] = await validator.registerValidation(req);

        if (check){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                const user = await User.create(req.body);
                user.password = undefined;

                return res.status(201).json({
                    user,
                    accessToken: await signAcessToken({ id: user.id }),
                    refreshToken: await signRefreshToken({ id: user.id })
                });

            } catch (err) {
                return res.status(500).json({ err: "Não foi possivel adicionar o usuario" });
            }
        } 

        return res.status(400).json({ error: msg });

    },
//     async logout(req, res){
//         try {

//         }
//     }
}
