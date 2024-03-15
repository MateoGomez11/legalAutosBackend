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
    //Llave foranea vehiculo persona.
    /*person.hasMany(vehicle,{
        foreignKey: 'personId',
        onDelete: 'restrict',
        onUpdate:'cascade'
    });
    vehicle.belongsTo(person,{
        foreignKey: 'personId'
    });*/
    person.hasMany(vehicle,{
        foreignKey: 'personId',
        onDelete: 'restrict',
        onUpdate:'cascade'
    });
    vehicle.belongsTo(person,{
        foreignKey: 'personId'
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