# :clapper:Filmy:clapper:

[![Build Status](https://github.com/carlocorradini/filmy/workflows/build/badge.svg)](https://github.com/carlocorradini/filmy/actions)

## Members

|  Name   |  Surname  |     Username      |    MAT     |
| :-----: | :-------: | :---------------: | :--------: |
|  Carlo  | Corradini | `carlocorradini`  | **192451** |
| Grigore | Andronic  | `grigoreandronic` | **192343** |
|  Luca   |  Santoro  |    `SantraxLS`    | **195342** |
| Miraxh  |  Tereziu  |  `MiraxhTereziu`  | **195067** |
|  Ayoub  |  Saghir   |   `AyoubSaghir`   | **195605** |

## Description

A little set of [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) that allow users to get films/actors or their infos. It uses a system of data validation for the user's requests.

The user has the capacity to view all the items or to ask for a specific film/actor by ID.
The user is allowed to access the database informations via _GET_ requests without any need of authentication. _Tokens_ are used to gain the permissions required to alterate the content of the database (for instance: add, update and delete items).

It uses a system of _continuous integration_, using _Git Actions_, and _continuous deployment_ with [Heroku](https://www.heroku.com/). After each commit, the code is subject to various tests and each push (of code that passed previous tests) on the master branch will automatically push and run the new version on Heroku.

Using [Husky](https://github.com/typicode/husky) and [Lint-staged](https://github.com/okonet/lint-staged) we used _git hooks_ for having continuous integration in local too with the aim to have standardized code between developer and more conscious code writing.

## Run

1. Clone the repo and install the dependencies by doing

```console
$   git clone https://github.com/carlocorradini/filmy
$   cd filmy
$   npm install
```

2. Run the application in **dev mode** (start:dev) or in **prod mode** (start:prod)

```console
$   npm run start:dev
```

or

```console
$   npm run build
$   npm run start:prod
```

**NB**: _"prod mode" uses builded files to run, so it's **mandatory** to do "npm run build" before executing the "prod mode"_

3. Run the tests by doing:

```console
$   npm test
```

### Database

- Create the database

1. Open the SQL Shell
2. Provide the data requested
3. Enter the command

```console
$ CREATE DATABASE [name]
```

> Where [name] is the database name provided in **env. file at DATABASE_URL**

4. Open command line window
5. Go to PostgreSQL bin folder

```console
$ PG_HOME/bin
```

6. Restore the database

```console
  $ psql -U [username] -d [name] -f backup.sql
```

### Authentication

1. Request the token by doing a request at "_.../api/v1/auth/signin_" with credentials in the body.

Example of body of the POST request:

```
{
  "username": "Admin",
  "password": "Password1234"
}
```

Example of the reply

```
{
  "success": true,
  "status_code": 200,
  "status_message": "Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwODQ0YThjLTdiYTctNGQxYS1hZGVhLWU4ODFiNmE5ZjMxMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1NzUyODA2MjYsImV4cCI6MTU3NTI4NDIyNn0.K0aknnEJazNH1Kan3DjdHnkjCO-_M80tiNqWcSF-BFQ"
  }
}
```

2. Use the protected request by inserting in the **header** of the request the value "bearer [TOKEN]" where _[TOKEN]_ is the token you were given in the step 1.

Example of the authorization **header**:

```
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwODQ0YThjLTdiYTctNGQxYS1hZGVhLWU4ODFiNmE5ZjMxMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1NzUyODA2MjYsImV4cCI6MTU3NTI4NDIyNn0.K0aknnEJazNH1Kan3DjdHnkjCO-_M80tiNqWcSF-BFQ"
```

NB: the **token's validity is 1 hour**, after that time is necessary to request a new token

## SCRUM

Scrum is an agile way to manage a project, usually software development. Agile software development with Scrum is often perceived as a methodology; but rather than viewing Scrum as methodology, think of it as a framework for managing a process.
Further information is available at the following address: https://www.mountaingoatsoftware.com/agile/scrum

**Full SCRUM process documentation avaiable under [SCRUM folder](https://github.com/carlocorradini/filmy/tree/master/SCRUM).**

## Built with

- [NodeJS](https://nodejs.org/it/) - JavaScript run-time environment
- [Git](https://git-scm.com) - Distributed version control system
- [Heroku](https://www.heroku.com/) - Hosting service

## Endpoints

For a more detailed description go to our [documentation](https://filmy-19.herokuapp.com/api/v1/docs/)

| Endpoint                                                                                                                                                                                        | Method | Description                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| http://filmy-19.herokuapp.com/v1/auth/signin                                                                                                                                                    |  POST  | Get authentication token                                                                                                                               |
| http://filmy-19.herokuapp.com/api/v1/status                                                                                                                                                     |  GET   | Get APIs status                                                                                                                                        |
| http://filmy-19.herokuapp.com/v1/film <ol>Query options:<li>title=_string_</li><li>release*year=\_integer*</li><li>rating=_integer_</li></ol>                                                   |  GET   | Get all films <ol>Description of query options:<li>by title</li><li>by release year</li><li>>= inserted rating</li></ol>                               |
| http://filmy-19.herokuapp.com/v1/film                                                                                                                                                           |  POST  | Add a new film                                                                                                                                         |
| http://filmy-19.herokuapp.com/v1/film/{filmID}                                                                                                                                                  |  GET   | Get film by ID                                                                                                                                         |
| http://filmy-19.herokuapp.com/v1/film/{filmID}                                                                                                                                                  |  PUT   | Update film by ID                                                                                                                                      |
| http://filmy-19.herokuapp.com/v1/film/{filmID}                                                                                                                                                  | DELETE | Delete film by ID                                                                                                                                      |
| http://filmy-19.herokuapp.com/v1/actor <ol>Query options:<li>name=_string_</li><li>surname=_string_</li><li>birth*year=\_integer*</li><li>death*year=\_integer*</li><li>gender=_char_</li></ol> |  GET   | Get all actors <ol>Description of query options:<li>by name</li><li>by surname</li><li>by birth year</li><li>by death year</li><li>by gender</li></ol> |
| http://filmy-19.herokuapp.com/v1/actor                                                                                                                                                          |  POST  | Add new actor                                                                                                                                          |
| http://filmy-19.herokuapp.com/v1/actor/{actorID}                                                                                                                                                |  GET   | Get actor by ID                                                                                                                                        |
| http://filmy-19.herokuapp.com/v1/actor/{actorID}                                                                                                                                                |  PUT   | Update actor by ID                                                                                                                                     |
| http://filmy-19.herokuapp.com/v1/actor/{actorID}                                                                                                                                                | DELETE | Delete actor by ID                                                                                                                                     |
| http://filmy-19.herokuapp.com/v1/user                                                                                                                                                           |  GET   | Get all users                                                                                                                                          |
| http://filmy-19.herokuapp.com/v1/user                                                                                                                                                           |  POST  | Add new user                                                                                                                                           |
| http://filmy-19.herokuapp.com/v1/user/{userID}                                                                                                                                                  |  GET   | Get user by ID                                                                                                                                         |
| http://filmy-19.herokuapp.com/v1/user/{userID}                                                                                                                                                  |  PUT   | Update user by ID                                                                                                                                      |
| http://filmy-19.herokuapp.com/v1/user/{userID}                                                                                                                                                  | DELETE | Delete user by ID                                                                                                                                      |

### Examples of query options usage

Example 1

```
http://filmy-19.herokuapp.com/v1/film?release_year=2017
```

Example 2

```
http://filmy-19.herokuapp.com/v1/film?release_year=2017&rating=70
```

#### Results

Result 1

```
{"success":true,"status_code":200,"status_message":"Success","data":[{"id":5,"title":"Guardians of the Galaxy Vol. 2 ","rating":77,"release_date":"2017-05-05","poster":"https://image.tmdb.org/t/p/w600_and_h900_bestv2/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg","actors":[9,10]},{"id":8,"title":"Baywatch ","rating":61,"release_date":"2017-05-26","poster":"https://image.tmdb.org/t/p/w600_and_h900_bestv2/6HE4xd8zloDqmjMZuhUCCw2UcY1.jpg","actors":[12,15,16]}]}
```

Result 2

```
{"success":true,"status_code":200,"status_message":"Success","data":[{"id":5,"title":"Guardians of the Galaxy Vol. 2 ","rating":77,"release_date":"2017-05-05","poster":"https://image.tmdb.org/t/p/w600_and_h900_bestv2/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg","actors":[9,10]}]}
```

## Dependancies

|                                      Dependancy                                      | Description                                                                                                                                                                                                                                                                                                     |
| :----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  [bcryptjs](https://www.npmjs.com/package/bcryptjs)                  | A library that hash passwords                                                                                                                                                                                                                                                                                   |
|               [body-parser](https://www.npmjs.com/package/body-parser)               | Node.js body parsing middleware                                                                                                                                                                                                                                                                                 |
|           [class-validator](https://www.npmjs.com/package/class-validator)           | Allows use of decorator and non-decorator based validation. Internally uses [validator](https://www.npmjs.com/package/validator).js to perform validation                                                                                                                                                       |
|               [compression](https://www.npmjs.com/package/compression)               | Node.js compression middleware                                                                                                                                                                                                                                                                                  |
|                      [cors](https://www.npmjs.com/package/cors)                      | Provide a Express middleware that can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) wth various options                                                                                                                                                                 |
|                 [cross-env](https://www.npmjs.com/package/cross-env)                 | Run scripts that set and use environment variables across platforms                                                                                                                                                                                                                                             |
|                    [dotenv](https://www.npmjs.com/package/dotenv)                    | Is a zero-dependency module that loads environment variables from a .env file into [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env). Storing configuration in the environment separate from code is based on The [Twelve-Factor App](https://12factor.net/config) methodology |
|                   [express](https://www.npmjs.com/package/express)                   | Fast, unopinionated, minimalist web framework for [node](https://nodejs.org/en/)                                                                                                                                                                                                                                |
|                    [helmet](https://www.npmjs.com/package/helmet)                    | Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!                                                                                                                                                                                           |
|              [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)              | An implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519)                                                                                                                                                                                                                                     |
|                        [pg](https://www.npmjs.com/package/pg)                        | Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings                                                                                                                                                                                                                  |
|          [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)          | Proposal to add Metadata to ECMAScript                                                                                                                                                                                                                                                                          |
|             [serve-favicon](https://www.npmjs.com/package/serve-favicon)             | Node.js middleware for serving a [favicon](https://en.wikipedia.org/wiki/Favicon)                                                                                                                                                                                                                               |
|        [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)        | This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a [swagger](https://swagger.io/tools/swagger-ui/).json file. The result is living documentation for your API hosted from your API server via a route                                                        |
|                   [typeorm](https://www.npmjs.com/package/typeorm)                   | Is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) that can run in NodeJS                                                                                                                                                                                                                     |
|                   [winston](https://www.npmjs.com/package/winston)                   | A logger for just about everything                                                                                                                                                                                                                                                                              |
| [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file) | A transport for [winston](https://www.npmjs.com/package/winston) which logs to a rotating file. Logs can be rotated based on a date, size limit, and old logs can be removed based on count or elapsed days                                                                                                     |
|                    [yamljs](https://www.npmjs.com/package/yamljs)                    | Standalone JavaScript YAML 1.2 Parser & Encoder. Works under node.js and all major browsers. Also brings command line YAML/JSON conversion tools                                                                                                                                                                |

## Scripts

|       Script        | Description                                                                                        |
| :-----------------: | :------------------------------------------------------------------------------------------------- |
|      [clean]()      | Deletes the content of "build" and "log" directories                                               |
|     [update]()      | Shows the updates for outdated dependancies                                                        |
| [update:install]()  | Updates and install the dependancies to the latest version                                         |
|    [prettify]()     | Parses the code to a prettier and easy to read version                                             |
| [prettify:staged]() | Runs **_prettify_** against staged git files                                                       |
|      [lint]()       | Analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs |
|   [lint:staged]()   | Runs **_lint_** against staged git files                                                           |
|      [build]()      | Compiles source code and copy the resources                                                        |
|      [test]()       | Runs a set of tests                                                                                |
|   [test:staged]()   | Runs **_test_** against staged git files                                                           |
|   [start:prod]()    | Runs the server with compiled files                                                                |
|    [start:dev]()    | Runs a local copy the server without compiling. Just for Dev mode                                  |

## License

[MIT](https://github.com/carlocorradini/filmy/blob/master/LICENSE)
