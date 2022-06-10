'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {

    static associate(models) {

    }
  }
  Tasks.init({
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "createdAt"
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updatedAt"
    }
  }, {
    sequelize,
    modelName: "Tasks",
    tableName: "tasks"
  });
  return Tasks;
};