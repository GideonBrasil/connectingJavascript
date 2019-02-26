// settings.json
const settings = require("./settings");
// require knex library and pass connection params
const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

// take in a first name, last name and birthdate
const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

// function for handling select and filtering table
knex.select(`'${first_name}', '${last_name}', '${birthdate}'`).from('famous_people');



