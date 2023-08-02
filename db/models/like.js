"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.sighting);
    }
  }
  Like.init(
    {
      // in models we use camelCase
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "like",
      underscored: true,
    }
  );
  return Like;
};
