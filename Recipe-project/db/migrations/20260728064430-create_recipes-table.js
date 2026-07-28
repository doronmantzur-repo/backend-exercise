"use strict";
//recipe example
// {
//     "title": "Recipe Title1",
//     "description": "Brief description",
//     "ingredients": [
//       "ingredient 1",
//       "ingredient 2"
//     ],
//     "instructions": [
//       "step 1",
//       "step 2"
//     ],
//     "cookingTime": 4.5,
//     "servings": 4,
//     "difficulty": "easy",
//     "rating": 4.5,
//     "id": "edbb0e5d-1485-446c-8503-d847cf5c1635",
//     "createdAt": "2026-07-26T12:51:44.028Z"
//   },
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("recipes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 500],
        },
        ingredients: {
          type: Sequelize.JSON,
          allowNull: false,
        },

        instructions: {
          type: Sequelize.JSON,
          allowNull: false,
        },

        cookingTime: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },

        servings: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        difficulty: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        rating: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
