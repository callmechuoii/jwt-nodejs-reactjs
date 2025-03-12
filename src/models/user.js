'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Group, { foreignKey: 'groupId' });
      User.belongsToMany(models.Project, { through: 'Project_User' });
      // define association here
    }
  };

  //object relational mapping
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};