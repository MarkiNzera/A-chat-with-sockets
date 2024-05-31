'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");

const Users = require("./users")

class PrivateMessages extends Model {
    static associate(models) {
        this.belongsToMany(models.Users);
    }
}
PrivateMessages.init({
    pvMessageId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    content: DataTypes.STRING
}, {
    sequelize,
    modelName: 'PrivateMessages',
});

PrivateMessages.hasOne(Users);

module.exports = PrivateMessages;
