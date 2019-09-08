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

const findAll = async (page = 1, limit = 30, title =  "") => {

  const totalItems = await knex.count({ count: '*' })
    .from(tableName)
    .where('title', 'like', `%${title}%`)
    .limit(limit)
    .then(quantity => quantity.reduce((sum, element)  => element))
    .catch(error => error)

  const offsetStartIn = (page  -1) * limit

  const records = await knex.select()
    .from(tableName)
    .where('title', 'like', `%${title}%`)   
    .limit(limit)
    .offset(offsetStartIn)
    .orderBy('title')
    .then(records => records)
    .catch(error => error)

  return {
    records: records,
    totalItems: totalItems.count
  }
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

module.exports = {
  destroy,
  find,
  findAll,
  findByTitle,
  save
}
