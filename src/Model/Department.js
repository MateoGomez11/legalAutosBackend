const {Model, DataTypes} = require('sequelize');
const connection = require ('../dataBase/connection');

class department extends Model{}

department.init({
    departmentId: {
        type: DataTypes.STRING,
        primaryKey:true,
        unique: true
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: connection,
    modelName: 'department',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = department;