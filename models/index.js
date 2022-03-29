const { sequelize } = require('./connection');
const User = require('./user');
const Dashboard = require('./dashboard');

const db = {};

db.sequelize = sequelize;

// model 생성
db.User = User;
db.Dashboard = Dashboard;

// model init
User.init(sequelize);
Dashboard.init(sequelize);

// association(관계 생성)

module.exports = db;
