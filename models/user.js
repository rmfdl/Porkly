"use strict";
const { Model } = require("sequelize");
const bcrypt =require ("bcryptjs")
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
      nomorHp: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    }, 
    {
      hooks: {

      beforeCreate(User, options){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(User.password, salt);
        console.log(hash, "hash.......");
        User.password = hash
             
      }
      },
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
