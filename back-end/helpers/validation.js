const joi = require('joi');
const bcrypt2 = require('bcrypt');

const Users = require('../models/users');

module.exports = {
    async loginValidator(body){
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });

        const { error } = schema.validate(body);

        if (error){
            return [ false, error.details[0], null];
        }

        try {

            let checkedUser = await Users.findOne({ where: { username: body.username } }, { attributes: ["username", "password", "fistname", "lastname", "email"] });
            if (!checkedUser){
                return [ false, 'User not found', null ];
            }
        
            const PwdCheck = await bcrypt2.compare(body.password, checkedUser.password);
            if (!PwdCheck){
                return [ false, 'Invalid password', null ];
            }

            return [ true, null, checkedUser ];
        } catch (err){
            return [ false, err, null ];
        }
        
    },

    async registerValidation(body) {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
            firstname: joi.string().required(),
            lastname: joi.string().required(),
            email: joi.string().required(),
        });

        const { error } = schema.validate(body);

        if (error){
            return [ false, error.details[0].message, null];
        }
        try {

            let checkedUser = await Users.findOne({ where: { username: body.username } }, { attributes: ["username", "password", "fistname", "lastname", "email"] });
            if (checkedUser){
                return [ false, 'User already exists', null ];
            }
        
            return [ true, null ];
        } catch (err) {
            return [ false, err, null ];
        }

    }
}
