
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('milestones', function(table){
          table.increments();
          table.string('descritpion');
          table.date('date_archived');
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('milestones')
      ])
};