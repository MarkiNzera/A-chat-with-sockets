'use strict';
const { Model } = require('sequelize');
const sequelize = require("../config/database");

class Groups extends Model {
    static associate(models) {
      // define association here
    }
}
Groups.init({
    groupName: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
    modelName: 'Groups',
});

module.exports = Groups;
