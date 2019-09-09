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

  await postItModel.save(parameters.title, parameters.description)

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

  await postItModel.destroy(record.id)

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

  const page = parseInt(request.query.page) || 1
  const itemsPerPage = 30
  const title = request.query.title || ''
  
  postItModel.findAll(page, itemsPerPage, title)
    .then(data => {
      
      response.json({
        itemsPerPage,
        records: data.records,
        totalItems: data.totalItems,
        currentPage: page
      })
    })
}

module.exports = { create, destroy, retrieve, retrieveAll }
