"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Sighting_Categories extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  Sighting_Categories.init(
    {
      //   name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sighting_categories",
      underscored: true,
    }
  );
  return Sighting_Categories;
};
