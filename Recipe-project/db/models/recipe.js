// const { DataTypes } = require('sequelize');

//To be updated to Recipe

// module.exports = (sequelize) => {
//  const User = sequelize.define('User', {
//    id: {
//      type: DataTypes.INTEGER,
//      primaryKey: true,
//      autoIncrement: true
//    },
//    firstName: {
//      type: DataTypes.STRING(50),
//      allowNull: false,
//      validate: {
//        notEmpty: true,
//        len: [1, 50]
//      }
//    },
//    email: {
//      type: DataTypes.STRING,
//      allowNull: false,
//      unique: true,
//      validate: {
//        isEmail: true
//      }
//    },
//    age: {
//      type: DataTypes.INTEGER,
//      allowNull: true,
//      validate: {
//        min: 0,
//        max: 120
//      }
//    }
//  }, {
//    tableName: 'Users',
//    timestamps: true, // Adds createdAt and updatedAt
//    underscored: false // Use camelCase instead of snake_case
//  });

//  return User;
// };