"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.sighting, { through: "sighting_categories" });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      freezeTableName: "category",
      underscored: true,
    }
  );
  return Category;
};
