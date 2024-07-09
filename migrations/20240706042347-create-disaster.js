'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Disasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_bencana: {
        type: Sequelize.DATE
      },
      provinsi: {
        type: Sequelize.STRING
      },
      kota_kabupaten: {
        type: Sequelize.STRING
      },
      alamat_lokasi: {
        type: Sequelize.STRING
      },
      bencana_alam: {
        type: Sequelize.STRING
      },
      penjelasan_penyebab: {
        type: Sequelize.TEXT
      },
      korban_jiwa: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Disasters');
  }
};