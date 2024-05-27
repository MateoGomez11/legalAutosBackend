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

async function sync() {

    //Llave foranea person - membership
    person.hasOne(membership, {
        foreignKey: 'personId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    membership.belongsTo(person, {
        foreignKey: 'personId'
    });

    //Foreign key vehicle - person.
    person.hasMany(vehicle,{
        foreignKey: 'personId',
        onDelete: 'restrict',
        onUpdate: 'cascade'

    });
    vehicle.belongsTo(person, {
        foreignKey: 'personId'
    });


    //Foreign key publication - vehicle
    vehicle.hasOne(publication, {
        foreignKey: 'vehicleId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    publication.belongsTo(vehicle, {
        foreignKey: 'vehicleId'
    });

    //Foreign key department - city
    department.hasMany(city, {
        foreignKey: 'departmentId',
        onDelete: 'restrict',
        onUpdate: 'cascade'

    });
    city.belongsTo(department, {
        foreignKey: 'departmentId'
    });

    //Foreign key seller - publication
    person.hasMany(publication, {
        foreignKey: 'personId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    publication.belongsTo(person, {
        foreignKey: 'personId'
    });


    // Data Base
    await connection.sync({force: false})
    .then(() => { 
        console.log('Synchronized DataBase');
    })
    .catch((error) => { 
        console.error('Error syncing DataBase' + error);
    }); 

    //create json
    departamentjson.createDepartments();
    cityjson.createCities();
}
sync();
