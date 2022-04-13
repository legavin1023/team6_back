const Sequelize = require('sequelize');

module.exports = class History extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      history_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      products_all: {
        type: Sequelize.INTEGER,
      },
      products_good: {
        type: Sequelize.INTEGER,
      },
      products_error: {
        type: Sequelize.INTEGER,
      },
      start_at: {
        type: Sequelize.DATE,
      },
      end_at: {
        type: Sequelize.DATE,
      },
      userid: {
        type: Sequelize.STRING(100),
      },
      remarks: {
        type: Sequelize.TEXT,
      },

    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.History.belongsTo(db.User, { foreignKey: 'userid', targetKey: 'userid' });
  }
};
