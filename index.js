const express = require('express')
const app =  express()
const bodyParser = require('body-parser')

const postItController = require('./controllers/post-it-controller')

/**
 * Injeta body parser de json
 */
app.use(bodyParser.json())

/**
 * Página inicial
 */
app.get('/', function(req, res)  {
  res.send('Hello World')
})

/**
 * Post-Its
 */
app.route('/post-its')
  .get(postItController.retrieveAll)
  .post(postItController.create)

app.route('/post-its/:id')
  .delete(postItController.destroy)
  .get(postItController.retrieve)

/**
 * Porta de escuta
 */
app.listen(8000, function() {
  console.log('Aplicação escutando na porta 8000...')
})
