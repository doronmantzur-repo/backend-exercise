"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const relations = require("../json/pokemon_trainers_pokemons.json");

    await queryInterface.bulkInsert("pokemon_trainers_pokemons", relations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pokemon_trainers_pokemons", null, {});
  }
};
