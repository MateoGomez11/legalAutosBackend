const connection = require('./connection');
//Model

const vehicle = require('../Model/Vehicle');
const publication = require('../Model/Publication');
const membership = require('../Model/Membership');
const person = require('../Model/Person');
const department = require('../Model/department');
const city = require('../Model/city');

//JSON
const departamentjson = require('./jsonfiles/departmentjson');
const cityjson = require('./jsonfiles/cityjson');

async function sync(){
    //Llave foranea vehiculo persona.
    person.hasMany(vehicle,{
        foreingKey: 'vehicleId',
        onDelete: 'restrict',
        onUpdate:'cascade'
    });
    vehicle.belongsTo(person,{
        foreingKey: 'personId'
    });

    // Base de datos
    await connection.sync({force: false})
    .then(() => { 
        console.log('Synchronized DataBase');
    })
    .catch((error) => { 
        console.error('Error syncing DataBase' + error);
    }); 
}
sync();