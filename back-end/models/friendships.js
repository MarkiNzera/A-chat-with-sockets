'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");


class Friendships extends Model {
    static associate(models) {
      // define association here
    }
}
Friendships.init({
    friendshipId: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Friendships',
});

module.exports = Friendships;
