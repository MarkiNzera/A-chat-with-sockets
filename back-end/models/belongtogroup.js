'use strict';
const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/database");

class BelongToGroups extends Model {
    static associate(models) {
      // define association here
    }
}
BelongToGroup.init({
    userId: DataTypes.INTEGER,
    groudId: DataTypes.INTEGER
}, {
    sequelize,
    timestamps: false,
    modelName: 'BelongToGroups',
});
module.exports = BelongToGroups;
