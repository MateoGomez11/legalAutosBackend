const { Sequelize } = require('sequelize');
var dataBase = 'legalAutosBD';
var userName = 'postgres';
var password = 'contrasenaDeCadaQuien';
const connection = new Sequelize(dataBase, userName, password, {
    host: 'localhost',
    dialect: 'postgres'
});



module.exports = connection;