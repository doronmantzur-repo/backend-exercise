"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const pokemons = require("C:/TechTroop/Bakend/Exercise/sql-express-sequelize/db/json/pokemon.json");

    await queryInterface.bulkInsert("pokemons", pokemons, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pokemons", null, {});
  },
};
