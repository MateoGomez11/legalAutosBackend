const connection = require('./connection');
//Model
const vehicle = require('../Model/Vehicle');
const publication = require('../Model/Publication');
const membership = require('../Model/Membership');
const person = require('../Model/Person');
const department = require('../Model/Department');
const city = require('../Model/City');

//JSON
const departamentjson = require('./jsonfiles/departmentjson');
const cityjson = require('./jsonfiles/cityjson');

async function sync(){
    //Llave foranea vehicle - person.
    person.hasMany(vehicle,{
        foreingKey: 'vehicleId',
        onDelete: 'restrict',
        onUpdate:'cascade'
        
    });
    vehicle.belongsTo(person,{
        foreingKey: 'personId'
    });

    //Llave foranea publication - vehicle
    publication.hasMany(vehicle, {
        foreignKey: 'vehicleId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    vehicle.belongsTo(publication, {
        foreignKey: 'publicationId'
    });

    //Llave foranea departament - city
    department.hasMany(city, {
        foreignKey: 'departmentId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
        
    });
    city.belongsTo(department, {
        foreignKey: 'departmentId'
    });


    // Base de datos
    await connection.sync({force: false})
    .then(() => { 
        console.log('Synchronized DataBase');
    })
    .catch((error) => { 
        console.error('Error syncing DataBase' + error);
    }); 

    departamentjson.createDepartments();
    cityjson.createCities();
}
sync();