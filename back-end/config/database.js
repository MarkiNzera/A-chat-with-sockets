require('dotenv').config();

const { Sequelize } = require('sequelize');

const Users = require("../models/users");
const PrivateMessages = require("../models/privatemessages");
const Groups = require("../models/groups");
const GroupMessages = require("../models/groupmessages");
const Friendships = require("../models/friendships");
const BelongToGroups = require("../models/belongtogroup");

const config = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
};

const connection = new Sequelize(config);

Friendships.init(connection);
Users.init(connection);
Groups.init(connection);
PrivateMessages.init(connection);
GroupMessages.init(connection);
BelongToGroups.init(connection);

Users.associate(connection.models);
PrivateMessages.associate(connection.models);
Groups.associate(connection.models);
GroupMessages.associate(connection.models);

module.exports = connection;