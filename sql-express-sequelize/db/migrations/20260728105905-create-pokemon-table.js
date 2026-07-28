'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Create pokemons table
    await queryInterface.createTable("pokemons", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(
          "grass",
          "fire",
          "water",
          "bug",
          "normal",
          "poison",
          "electric",
          "ground",
          "fairy",
          "psychic",
          "rock",
          "ghost",
          "ice",
          "dragon"
        ),
        allowNull: false
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    // 2️⃣ Create pokemon_trainers table
    await queryInterface.createTable("pokemon_trainers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      town: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });

    // 3️⃣ Create junction table for many‑to‑many
    await queryInterface.createTable("pokemon_trainers_pokemons", {
      pokemon_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemons",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemon_trainers",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  }
};