const {Model, DataTypes} = require('sequelize');
const connection = require ('../dataBase/connection');

class Department extends Model{}

Department.init({
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

module.exports = Department;