module.exports = (sequelize, DataTypes) => {
  const Disaster = sequelize.define('Disaster', {
    tanggal_bencana: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kota_kabupaten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_lokasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bencana_alam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penjelasan_penyebab: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    korban_jiwa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Disaster;
};
