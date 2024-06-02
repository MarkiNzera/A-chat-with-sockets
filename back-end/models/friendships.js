'use strict';
const { Model, DataTypes} = require('sequelize');


class Friendships extends Model {
    static init(sequelize) {
        super.init({
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
      // define association here
    }
}
module.exports = Friendships;
