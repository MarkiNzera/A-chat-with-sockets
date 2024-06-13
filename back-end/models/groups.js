'use strict';
const { Model , DataTypes } = require('sequelize');

class Groups extends Model {
    static init(sequelize) {
        super.init({
            groupId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            groupName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Groups',
        });
    }
    static associate(models) {
        this.belongsToMany(models.Users, { through: models.BelongToGroups, foreignKey: 'groupId' });
        this.hasMany(models.GroupMessages, { foreignKey: "groupId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
}

module.exports = Groups;
