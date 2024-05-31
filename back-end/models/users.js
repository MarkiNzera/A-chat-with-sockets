'use strict';
const {Model, DataTypes} = require('sequelize');

const sequelize = require("../config/database");

class Users extends Model {
    static associate(models) {
        this.hasMany(this, { through: models.Friendships });
        this.belongsToMany(this, { through: models.Friendships });

        this.hasMany(models.PrivateMessages);

        this.belongsToMany(models.Groups, { through: models.BelongToGroups });
    }
}
Users.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'Users',
});
  
module.exports = Users;
