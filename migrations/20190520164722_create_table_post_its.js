
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_its', table => {
    table.increments('id').primary()
    table.string('title').notNull().unique()
    table.string('description', 500).notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_its')
};
