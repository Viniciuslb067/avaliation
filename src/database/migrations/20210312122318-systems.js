'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('systems', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
      system: {
        type: Sequelize.STRING,
        allowNull: false
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false
       },
       area: {
        type: Sequelize.STRING,
        allowNull: false
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('systems');
     */
  }
};
