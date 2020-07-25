    const Sequelize = require('sequelize')
    const connectionString = process.env.DATABASE_URL ||'postgres://postgres:0209@localhost:5432/banking';
    const db = new Sequelize(connectionString);

module.exports = db;