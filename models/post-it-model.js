const knex = require('../dbConection')

const tableName = 'post_its'

const destroy = async id => {
  return knex.transaction((trx) => {
    
    knex(tableName).where('id', id).del()
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(error => error)
}

const find = async id => {
  const records = await knex
    .select()
    .from(tableName)
    .where('id', id)
    .first()
    .then(record => record)
    .catch(error => error)

  return records
}

const findAll = async () => {

  const records = knex.select().from(tableName)
    .then(records => records)
    .catch(error => error)

  return records
}

const findByTitle = async (title) => {

  const records = await knex.select().from(tableName).where('title', title)
    .then(records => records)
    .catch(error => error)

  return records
}

const save = async (title, description) => {
  return knex.transaction((trx) => {

    knex.insert({ title: title, description: description })
      .into(tableName)
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(error => error)
}

const search = async (filters) => {

  const title = filters.title

  const records = await knex
    .select()
    .from(tableName)
    .where('title', 'like', `%${title}%`)
    .then(records => records)
    .catch(error => error)

  return records
}

module.exports = {
  destroy,
  find,
  findAll,
  findByTitle,
  save,
  search
}
