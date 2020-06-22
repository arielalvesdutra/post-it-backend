# Description

Backend developed with Node.JS.

# Installation

1 - NPM install:

```bash
$ npm i
```

2 - Data Base

Create and set up a MySQL database.

Copy the `.env-example` file to `.env` and then insert database configurations in the `.env` file.

3 - Migration

Run the migrations:

```bash
$ knex migrate:latest
```

** If knex is not globally installed, it can be installed with the following command:

```bash
$ npm install knex -g
```

4 - NPM start

```bash
$ npm start
```

# Frontend 

Link [here](https://github.com/arielalvesdutra/post-it-frontend).

# Technologies used

- KnexJs
- ExpressJs
