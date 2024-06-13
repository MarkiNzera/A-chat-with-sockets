require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    signAccessToken(params) {
        const token = jwt.sign(params, secretKey, { expiresIn: "2h" });

        return token;
    },

    async authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const token = authHeader.split(" ")[1];

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(403).json({ message: "Token inválido!" });
                }
                next();
            });
        } else {
            res.status(401).json({ message: "Token não fornecido" });
        }
    }
}

