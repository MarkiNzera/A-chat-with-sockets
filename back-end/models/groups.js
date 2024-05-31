'use strict';
const { Model } = require('sequelize');
const sequelize = require("../config/database");

class Groups extends Model {
    static associate(models) {
        this.belongsToMany(this, { through: models.BelongToGroups });
        this.hasMany(models.GroupMessages)
    }
}
Groups.init({
    groupName: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Groups',
});

module.exports = Groups;
