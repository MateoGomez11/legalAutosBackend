const { Model, DataTypes } = require('sequelize');
const connection = require('../dataBase/connection');

class membership extends Model { }

membership.init({
    membershipId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    membershipState: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    membershipDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    membershipExpiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    membershipPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

}, {
    sequelize: connection,
    modelName: 'membership',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = membership;
