module.exports = function (sequelize, DataTypes) {
  let apikeys = sequelize.define('apikeys', {
    key: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  });

  apikeys.associate = function (models) {

  }

  return apikeys;
};
