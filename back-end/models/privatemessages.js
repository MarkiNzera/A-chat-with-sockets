'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");

class PrivateMessages extends Model {
    static associate(models) {
      // define association here
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

module.exports = PrivateMessages;
