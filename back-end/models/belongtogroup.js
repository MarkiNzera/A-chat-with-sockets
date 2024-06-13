'use strict';
const {Model, DataTypes} = require('sequelize');

class BelongToGroups extends Model {
    static init(sequelize) {
        super.init({
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            },
            groupId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Groups",
                    key: "groupId"
                }
            }
        }, 
        {
            sequelize,
            timestamps: true,
            modelName: 'BelongToGroups',
        });
    }
    static associate(models) {
      // define association here
    }
}
module.exports = BelongToGroups;
