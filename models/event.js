module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
      eventName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      eventDate: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Home);
  };

  return Event;
};