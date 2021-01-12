<h1 align="center">Todo App</h1>

![Demo](https://github.com/FelipeSimis/todo-app/blob/main/demo.gif)

## Prerequisites

- **NodeJS**: If you don't have it, just download it [here](https://nodejs.org/en/download/)
- **Yarn**: If you don't have it, just download it [here](https://classic.yarnpkg.com/lang/en/)

# Back-End

`todo-app/server`

## Techs

- [x] [Node](https://nodejs.org/en/)
- [x] [Express](https://github.com/expressjs/express)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [TypeORM](https://typeorm.io/#/)
- [x] [JWT](https://github.com/auth0/node-jsonwebtoken)
- [x] [Docker](https://www.docker.com/get-started)
- [x] [Postgres](https://www.postgresql.org/)
- [x] [BcryptJS](https://github.com/dcodeIO/bcrypt.js/)

## Getting Started

**Clone the project and access the folder**

```bash
  $ git clone https://github.com/FelipeSimis/todo-app.git

  # After cloning the project, run the following command
  $ cd todo-app/server #To access Back-End
  $ cd todo-app/web #To access Front-End
```

**Follow the steps below to configure Back-End**

```bash
# Install the dependencies
$ yarn

# Create the instance of postgreSQL using docker
# If you are already using port 5432, simply change to another
$ docker run --name todoapp-postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=todos_app -e POSTGRES_PASSWORD=postgresDocker -p 5432:5432 -d postgres


# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api
$ yarn dev

# Well done, project is started!
```

## Routes

<a href="https://insomnia.rest/run/?label=TodoApp&uri=https%3A%2F%2Fraw.githubusercontent.com%2FFelipeSimis%2Ftodo-app%2Fmaster%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

Default URL `http://localhost:3333`

| Route      | HTTP   | Description           | Auth   |
| ---------- | ------ | --------------------- | ------ |
| /todos     | POST   | Create Todo           | Bearer |
| /todos     | GET    | Select all user Todos | Bearer |
| /todos/:id | PATCH  | Complete task by ID   | Bearer |
| /todos/:id | DELETE | Delete Todo by ID     | Bearer |
| /users     | POST   | Create User           | None   |
| /users     | GET    | Select all Users      | None   |
| /auth      | POST   | Authenticate User     | None   |

# Front-End

`todo-app/web`

## Techs

- [x] [ReactJS](https://reactjs.org/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Styled-Components](https://styled-components.com/)
- [x] [Axios](https://github.com/axios/axios)
- [x] [Unform](https://unform.dev/)
- [x] [React-Spring](https://www.react-spring.io/)
- [x] [Yup](https://github.com/jquense/yup)

**Follow the steps bellow to configure Front-End**

1. Run `yarn` to install the dependencies
2. Run `yarn start` and access `http://localhost:3000`
