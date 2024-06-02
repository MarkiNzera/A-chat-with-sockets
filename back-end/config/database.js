const { Sequelize } = require('sequelize');

const Users = require("../models/users");
const PrivateMessages = require("../models/privatemessages");
const Groups = require("../models/groups");
const GroupMessages = require("../models/groupmessages");
const Friendships = require("../models/friendships");
const BelongToGroups = require("../models/belongtogroup");

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

Users.init(connection);
PrivateMessages.init(connection);
Groups.init(connection);
GroupMessages.init(connection);
Friendships.init(connection);
BelongToGroups.init(connection);

Users.associate(connection.models);
PrivateMessages.associate(connection.models);
Groups.associate(connection.models);
GroupMessages.associate(connection.models);

module.exports = connection;