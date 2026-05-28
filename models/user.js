"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Order);
    }
  }

  User.init(
    {
      nomorHp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone number required!" },
          notEmpty: { msg: "Phone number required!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already been used, use another email",
        },
        validate: {
          notNull: { msg: "Email required!" },
          notEmpty: { msg: "Email required! " },
          isEmail: { msg: "Invalid email format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password required!" },
          notEmpty: { msg: "Password Required!" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Role required!" },
          notEmpty: { msg: "Role Required!" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(User, options) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(User.password, salt);
          // console.log(hash, "hash.......");
          User.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
