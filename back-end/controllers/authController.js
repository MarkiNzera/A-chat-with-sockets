require('dotenv').config();

const bcrypt = require('bcrypt');

const User = require("../models/users");
const validator = require("../helpers/validation");
const { signAccessToken } = require("../middleware/validateAccessToken");


module.exports = {
    async login(req, res){
        let [check, msg, user] = await validator.loginValidator(req.body);
        if (check) {
            try {
                user.password = undefined;
                
                return res.status(201).json({
                    user,
                    accessToken: signAccessToken({id: user.id})
                });
            } catch (err) {
                return res.status(500).json({ message: err });
            }
        }

        return res.status(400).json({ message: msg });
    },
    async register(req, res){
        let [check, msg] = await validator.registerValidation(req.body);

        if (check){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                const user = await User.create(req.body);
                user.password = undefined;

                return res.status(201).json({
                    user,
                    accessToken: signAccessToken({ id: user.id })
                });

            } catch (err) {
                return res.status(500).json({ message: err });
            }
        } 

        return res.status(400).json({ message: msg });

    },
//     async logout(req, res){
//         try {

//         }
//     }
}
