const postItModel = require('../models/post-it-model')

const create = async (request, response) => {
  const parameters = request.body

  if(!parameters.title || !parameters.description) {
    response.sendStatus(400)
  } 

  const fetchByName = await postItModel.findByTitle(parameters.title)

  if (fetchByName.length) {
    return response.send("Já existe um post-it com esse título.")
  }

  postItModel.save(parameters.title, parameters.description)

  response.sendStatus(201)
}

const destroy = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response.sendStatus(400)
  }

  const record = await postItModel.find(id)

  if (!record) {
    response.status(400)
    return response.send("Registro não encontrado").end()
  }

  postItModel.destroy(record.id)

  response.sendStatus(200)
}

const retrieve = async (request, response) => {

  const id = request.params.id

  if (!id) {
    return response.sendStatus(400)
  }

  const record = await postItModel.find(id)

  if (!record) {
    response.status(400)
    return response.send("Registro não encontrado").end()
  }

  response.json(record)
}

const retrieveAll = async (request, response) => {

  const allRecords = await postItModel.findAll()

  response.json(allRecords)
}

const search = async (request, response) => {
  const params = request.query

  const records = await postItModel.search(params)

  response.json(records)
}

module.exports = { create, destroy, retrieve, retrieveAll, search }
