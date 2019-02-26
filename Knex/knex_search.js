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

// take in a single command line argument
const argvInput = process.argv[2];

// function for handling select and filtering table
const knexSelect = knex('famous_people')
.where({
  first_name: argvInput,
})
.orWhere({
  last_name: argvInput,
})
.select()

knexSelect.asCallback((err, rows) => {
  if (err) throw err;
  console.log('Searching ... ');
  console.log(`Found ${rows.length} person(s) by the name of '${argvInput}'`); 
  rows.forEach((item, index) => {
  //output: famous_people found in test_db
  console.log(`- ${index + 1}: ${item.first_name} ${item.last_name} , born '${item.birthdate.toISOString().slice(0, 10)}' `);
  knex.destroy();
  });
}); 