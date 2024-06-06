'use strict';
const { Model, DataTypes} = require('sequelize');


class Friendships extends Model {
    static init(sequelize) {
        super.init({
            friendshipId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            },
            friendId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            }
        }, 
        {
            sequelize,
            modelName: 'Friendships',
        });
    }
    static associate(models) {
        this.hasMany(models.PrivateMessages, { foreignKey: "friendshipId" });
    }
}
module.exports = Friendships;
