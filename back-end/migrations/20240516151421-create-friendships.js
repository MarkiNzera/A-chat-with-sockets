'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Friendships', {
            friendshipId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            },
            friendId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Friendships');
    }
};