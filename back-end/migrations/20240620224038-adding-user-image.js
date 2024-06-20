'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn("Users", "profilePhoto", {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "/src/assets/defaultUserImg.png"
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn("Users", "profilePhoto");
    }
};
