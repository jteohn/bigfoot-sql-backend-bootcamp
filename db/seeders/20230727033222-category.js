"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("category", [
      {
        name: "Sunny",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: "Cloudy",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    await queryInterface.bulkInsert("sighting_categories", [
      {
        sighting_id: 1,
        category_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        sighting_id: 2,
        category_id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sighting_categories", null, {});
    await queryInterface.bulkDelete("category", null, {});
  },
};
