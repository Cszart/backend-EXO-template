## Description

This is an API used to manage your notes where you can:

- Create a note
- Update a note
- Delete a note
- Archive and unarchive a note
- Create a category
- Update a category
- Delete a category
- Add categories to a note
- Remove categories from a note

This project was develop using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository and typeORM for PostgreSQL.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:prod

# Base URL: localhost:5000/api
```

You can check documentation and endpoints on [Postman](https://www.postman.com/cesaralone/workspace/e6700d6d-2195-4fb8-8e60-5d623819838b/overview) make sure to open "Documentation" tab

## Online server

If you want to test out the API on a running heroku server check this [Link](https://cesar-notes-api.herokuapp.com/api)

To test the API with a web interface check [Frontend App](https://cesar-notes-app.herokuapp.com/)

## Tecnologies

- NPM: 8.1.2
- NodeJS: 16.13.1
- NestJS: 9.0.0
- TypeORM: 0.3.7

No need to install PostgreSQL because app is connecting to remote server where the database is installed, this is a better approach to persist data and to avoid any further configuration or installation

## Stay in touch

- Author - [Cesar Salazar](bitemecesar@gmail.com)
