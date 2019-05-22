# Descrição

Backend desenvolvido em NodeJs.

# Instalação

1 - NPM install:

```bash
$ npm i
```

2 - Banco de dados

Criar e configurar os dados do banco de dados MySQL no arquivo `.env`.

3 - Migration

Executar a migration:

```bash
$ knex migrate:latest
```

** Se não tiver o knex instalado globalmente, é possível instalar com o comando:

```bash
$ npm install knex -g
```

4 - Executar o node

```bash
$ node index.js
```

# Frontend 

Link [aqui](https://github.com/arielalvesdutra/post-it-frontend).

# Tecnologias utilizadas

- KnexJs
- ExpressJs
