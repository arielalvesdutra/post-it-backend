const { db } = require('./.env')

module.exports = {
  client: 'mysql',
  connection: db
}
