const Sequelize = require('sequelize');

const config = {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: false,
    username: "postgres",
    password: "iBF^YkA*a24a@%",
    database: "chatsocket"
};

const connection = new Sequelize(config);

module.exports = connection;