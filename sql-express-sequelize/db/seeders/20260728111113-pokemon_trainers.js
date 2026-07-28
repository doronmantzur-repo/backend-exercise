"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const trainers = require("../json/pokemon_trainers.json");

    await queryInterface.bulkInsert("pokemon_trainers", trainers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pokemon_trainers", null, {});
  },
};
