const { tableName } = require('../models/post-it-model')

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, table => {
    table.datetime('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable(tableName, table => {
    table.dropColumn('created_at')
  })
};
