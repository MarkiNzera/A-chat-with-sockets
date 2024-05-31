'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");

class GroupMessages extends Model {
    static associate(models) {
        this.belongsTo(models.Groups);
    }
}
GroupMessages.init({
    content: DataTypes.STRING
}, {
    sequelize,
    modelName: 'GroupMessages',
});
return GroupMessages;
