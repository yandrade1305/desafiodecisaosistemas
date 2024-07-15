module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'creation_date'
    },
    conclusionDate: {
      type: DataTypes.DATE,
      field: 'conclusion_date'
    }
  }, {
    timestamps: false,
    tableName: 'activity'
  });
  return Activity;
};
