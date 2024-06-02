'use strict';
const { Model, DataTypes} = require('sequelize');

class PrivateMessages extends Model {
    static init(sequelize) {
        super.init({
            pvMessageId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'PrivateMessages',
        });
    }

    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: 'userId' });
    }
}

module.exports = PrivateMessages;
