const { tableName } = require('../models/post-it-model')

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, table => {
    table.increments('id').primary()
    table.string('title').notNull().unique()
    table.string('description', 500).notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName)
};
