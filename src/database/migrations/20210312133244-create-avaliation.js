'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('avaliations', { 
       uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
       },
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requester: {
        type: Sequelize.STRING,
        allowNull: false,
      },
       start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      system: {
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

    await queryInterface.dropTable('avaliations');
     
  }
};
