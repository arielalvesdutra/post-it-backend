const express = require('express')
const app =  express()
const bodyParser = require('body-parser')
const { server } = require('./.env')
const postItController = require('./controllers/post-it-controller')

if (server.port === undefined) throw Error("Favor definir a porta do servidor")

/**
 * Injeta body parser de json
 */
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * Página inicial
 */
app.get('/', function(req, res)  {
  res.send('Post-Its Backend.')
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
app.listen(server.port, function() {
  console.log(`Aplicação escutando na porta ${server.port}...`)
})
