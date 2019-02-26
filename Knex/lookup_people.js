const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// take in a single command line argument
const argvInput = process.argv[2];

// function for handling data input
function getFamousPeople(result, argvInput){
    console.log(`Found ${result.rows.length} person(s) by the name of '${argvInput}'`); 
    result.rows.forEach((item, index) => {
      //output: famous_people found in test_db
      console.log(`- ${index + 1}: ${item.first_name} ${item.last_name} , born '${item.birthdate.toISOString().slice(0, 10)}' `);
    });
  }
  
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  // query for famous people's first or last names using the argv input
  client.query("SELECT * from famous_people where first_name = $1::text or last_name = $1::text", [argvInput], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(`Found 2 person(s) by the name \'${argvInput}\': ${result.rows.length}`);
    getFamousPeople(result, argvInput); 
    client.end();
  });
});