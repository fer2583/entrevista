module.exports = (sequelize, DataTypes) => {
  const Button = sequelize.define('Button', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Button;
};