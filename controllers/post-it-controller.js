const postItModel = require('../models/post-it-model')

const create = async (request, response) => {
  const parameters = request.body
  const { title, description } = parameters

  if (!title || !description) {
    return response.status(400).send("Parâmetros obrigatórios não preenchidos")
  } 

  const fetchByName = await postItModel.findByTitle(title)

  if (fetchByName.length) {
    return response.status(400).send("Já existe um post-it com esse título.")
  }

  const createdPostItId = await postItModel.save(title, description)
  const createdPostIt = await postItModel.find(createdPostItId)
  
  response.status(201).send(createdPostIt)
}

const destroy = async (request, response) => {
  const id = request.params.id

  if (!id) {
    return response.sendStatus(400)
  }

  const record = await postItModel.find(id)

  if (!record) {
    return response.status(400).send("Registro não encontrado").end()
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
    return response.status(400).send("Registro não encontrado").end()
  }

  response.json(record)
}

const retrieveAll = async (request, response) => {

  const page = parseInt(request.query.page) || 1
  const itemsPerPage = 12
  const title = request.query.title || ''
  const description = request.query.description || ''
  
  postItModel.findAll(page, itemsPerPage, {title, description})
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
