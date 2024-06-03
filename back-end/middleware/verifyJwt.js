const jwt = require("jsonwebtoken");

const jwt_expiration = 10 * 60 * 1000;
const jwt_refresh_expiration = 60 * 60 * 24 * 30;

module.exports = {
    signAccessToken: (params) => {
        return new Promise((resolve, reject) => {
            jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, { expiresIn: jwt_expiration }, (err, token) => {
                if (err) {
                    reject();
                    return;
                }
                resolve(token);
            });
        });
    }
}
