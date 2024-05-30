'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");

class GroupMessages extends Model {
    static associate(models) {
      // define association here
    }
}
GroupMessages.init({
    content: DataTypes.STRING
}, {
    sequelize,
    modelName: 'GroupMessages',
});
return GroupMessages;
