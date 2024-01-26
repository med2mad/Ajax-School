var faker = require('faker');
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
   var dummyJSON = [];
   for(var i = 0 ; i < 5000 ; i++){
      dummyJSON.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        ip: faker.internet.ip(),
        address: faker.address.streetAddress(),
        city: faker.address.cityName()
      });
   }
   await queryInterface.bulkInsert('Users',dummyJSON,{});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};