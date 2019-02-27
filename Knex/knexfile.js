// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: require("./settings"),
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

