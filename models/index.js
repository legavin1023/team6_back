const { sequelize } = require('./connection');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;

// model init
User.init(sequelize);

// association(관계 생성)

module.exports = db;
