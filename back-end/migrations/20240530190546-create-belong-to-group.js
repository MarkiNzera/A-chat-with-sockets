'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BelongToGroups', {
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userId"
                }
            },
            groupId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Groups",
                    key: "groupId"
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BelongToGroups');
    }
};