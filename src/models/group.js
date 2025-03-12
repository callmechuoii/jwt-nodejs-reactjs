'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User, { foreignKey: 'groupId' });
      Group.belongsToMany(models.Role, { through: 'Group_Role', foreignKey: 'groupId' });
      // define association here
    }
  };

  //object relational mapping
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
    freezeTableName: true
  });
  return Group;
};