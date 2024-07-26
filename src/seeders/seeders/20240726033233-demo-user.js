'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    //  Add seed commands here.

    //  Example:
    await queryInterface.bulkInsert('Users',
      [
        {
          email: 'John Doe',
          username: 'johndoe',
          password: '123456'
        },

        {
          email: 'John Doe1',
          username: 'johndoe1',
          password: '123456'
        },

        {
          email: 'John Doe2',
          username: 'johndoe2',
          password: '123456'
        }

      ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
