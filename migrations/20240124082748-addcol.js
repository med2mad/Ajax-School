'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users','email',{ type : Sequelize.DataTypes.STRING });
    await queryInterface.addColumn('Users','ip',{ type : Sequelize.DataTypes.STRING });
    await queryInterface.addColumn('Users','phone',{ type : Sequelize.DataTypes.STRING });
    await queryInterface.addColumn('Users','address',{ type : Sequelize.DataTypes.STRING });
    await queryInterface.addColumn('Users','city',{ type : Sequelize.DataTypes.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users','email');
    await queryInterface.removeColumn('Users','ip');
    await queryInterface.removeColumn('Users','phone');
    await queryInterface.removeColumn('Users','address');
    await queryInterface.removeColumn('Users','city');
  }
};