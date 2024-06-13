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
            timestamps: true,
            modelName: 'PrivateMessages',
        });
    }

    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: 'userId' });
        this.belongsTo(models.Friendships, { foreignKey: 'friendshipId' });
    }
}

module.exports = PrivateMessages;
