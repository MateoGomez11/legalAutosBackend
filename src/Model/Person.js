const { Model, DataTypes } = require('sequelize');
const connection = require('../dataBase/connection');

class person extends Model { }

person.init({
    personId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    personName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personAge: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    personEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    personAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    personType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'Person',
    paranoid: true,
    deletedAt: 'destroyTime'
});



module.exports = person;