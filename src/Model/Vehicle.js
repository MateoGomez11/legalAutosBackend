const { Model, DataTypes } = require('sequelize');
const connection = require('../DataBase/connection');

class vehicle extends Model { }
vehicle.init({
    vehicleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleBrand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleBuyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleSellPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'vehicle',
    paranoid: true,
    deletedAt: 'destroyTime'
})

module.exports = vehicle;