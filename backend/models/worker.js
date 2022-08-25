'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    //only return the name and email
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.createdAt;
      delete values.updatedAt;
      delete values.id;
      return values;
    }
  }
  worker.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    employeeNumber: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    role: DataTypes.STRING,
    uuid: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'worker',
  });
  return worker;
};