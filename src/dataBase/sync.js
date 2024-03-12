const connection = require('./connection');
//Model

const vehicle = require('../Model/Vehicle');
const publication = require('../Model/Publication');
const membership = require('../Model/Membership');
const person = require('../Model/Person');
const department = require('../Models/department');
const city = require('../Models/city');

//JSON
const departamentjson = require('./jsonfiles/departmentjson');
const cityjson = require('./jsonfiles/cityjson');

async function sync(){
    await connection.sync({force: false})
    .then(() => { 
        console.log('Synchronized DataBase');
    })
    .catch((error) => { 
        console.error('Error syncing DataBase' + error);
    }); 
}
sync();