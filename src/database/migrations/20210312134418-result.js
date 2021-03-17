'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('results', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      ip_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avaliation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'avaliations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      system_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'systems', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },        
      note: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
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
     * await queryInterface.dropTable('results');
     */
  }
};
