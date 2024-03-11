const {Model, DataTypes} = require('sequelize');
const connection = require('../dataBase/connection');

class Person extends Model{}

person.init({
    personId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: connection,
    modelName: 'Person',
    paranoid : true,
    deleteAt: 'destroyTime'
});

module.exports = person;