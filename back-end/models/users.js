'use strict';
const {Model, DataTypes} = require('sequelize');

class Users extends Model {
    static init(sequelize){
        super.init({
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
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profilePhoto:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "/src/assets/defaultUserImg.png"
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Users',
        });
    }

    static associate(models) {
        this.belongsToMany(this, { as: "Friendship1", through: models.Friendships, foreignKey: 'userId', otherKey: 'friendId' });
        this.belongsToMany(this, { as: "Friendship2", through: models.Friendships, foreignKey: 'friendId', otherKey: 'userId' });

        this.hasMany(models.PrivateMessages, { foreignKey: 'userId' });
        this.hasMany(models.GroupMessages, { foreignKey: 'userId' });

        this.belongsToMany(models.Groups, { through: models.BelongToGroups, foreignKey: 'userId' });
    }
}
  
module.exports = Users;
