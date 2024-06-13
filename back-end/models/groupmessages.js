'use strict';
const { Model, DataTypes} = require('sequelize');

class GroupMessages extends Model {
    static init(sequelize) {
        super.init({
            gpmessageId: {
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
            modelName: 'GroupMessages',
        });
    }

    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: "userId" });
        this.belongsTo(models.Groups, { foreignKey: "groupId", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
}
module.exports = GroupMessages;
