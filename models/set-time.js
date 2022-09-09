'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Set_Time.init({
    set_time__id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'Set-Time',
    tableName: 'set-times',
    timestamps: false

  });
  return Set_Time;
};