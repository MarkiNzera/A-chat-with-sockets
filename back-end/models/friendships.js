'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");


class Friendships extends Model {
    static associate(models) {
      // define association here
    }
}
Friendships.init({
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    pvMessageId: DataTypes.INTEGER
}, {
    sequelize,
    timestamps: false,
    modelName: 'Friendships',
});

module.exports = Friendships;
