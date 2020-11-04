const sequelizePaginate = require('sequelize-paginate')

module.exports = function (sequelize, DataTypes) {
  let products = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'name needs to be filled'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'category needs to be filled'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  }, {
    freezeTableName: true
  });

  products.associate = function (models) {
    
  };

  sequelizePaginate.paginate(products);
  return products;
};
