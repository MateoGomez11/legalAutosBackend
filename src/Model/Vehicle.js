const { Model, DataTypes } = require('sequelize');
const connection = require('../dataBase/connection');
const person = require('../Model/Person');

    class vehicle extends Model { }
    vehicle.init({
        vehicleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        vehiclePlate: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        vehicleBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicleLine: {
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
        vehicleTrasmision: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicleCC: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicleColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicleSoat: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        vehicleTecno: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        vehicleState: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cityId: {
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
        buyDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sellDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        personId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'person',
                key: 'personId' 
            }
        }
    }, {
        sequelize: connection,
        modelName: 'vehicle',
        paranoid: true,
        deletedAt: 'destroyTime'
    });

    vehicle.belongsTo(person, {
        foreignKey: 'personId',
        onDelete: 'CASCADE' 
    });
    person.hasMany(vehicle,{
        foreignKey: 'personId'
    });
    
 
module.exports = vehicle;