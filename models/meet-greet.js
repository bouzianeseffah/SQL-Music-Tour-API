'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meet_Greet.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
  },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'Meet-Greet',
    tableName: 'meet-greets',
    timestamps: false

  });
  return Meet_Greet;
};