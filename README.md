# Choirly API

This RESTful API serves data to a [React Native application](https://github.com/ramonrodgal/choirly-fe).
The project is built using [Node.js](https://nodejs.org) and [Express.js](http://expressjs.com/).

All the data is stored in a [MongoDB](https://www.mongodb.com/) database and the application interacts with it using [mongoose](https://mongoosejs.com/).

## Link to hosted version

https://choirly.herokuapp.com/api/

## Instructions

### Requirements

    - Node v16.13.1

### Clone the repository

1- Open your terminal.

2- Change the current working directory to the location where you want the cloned directory.

3- Type the following command:

```
git clone https://github.com/ramonrodgal/choirly-be
```

### Install dependencies

1- Open your terminal.

2- Change the current working directory into the location you previously cloned the repository

3- Type the following command:

```
npm install
```

### Create database

To create your database follow this article instructions and select the option the best suits you.

https://www.mongodb.com/basics/create-database

### Environment variables

You need to create a file to set the database URL

```
touch .env
```

Inside the file you need to set two variables:

```
DATABASE_URL=URL-of-your-MongoDB-database
PORT=Port-number-you-want-to-use
```

### Seed local database

You have been provided with a 'db' folder with some data to populate the databases.

To create the collections and insert the data into them you need to write following script in the terminal:

```
npm run seed
```

### Run tests

This project have been created using TDD (Test Driven Development) with [Jest](https://jestjs.io/) for unit testing and [Supertest](https://www.npmjs.com/package/supertest) for testing HTTP requests.

You can find all the test inside the **test** folder. To run all the tests type the following script in the terminal:

```
npm test
```

To make sure that all test will not be affected by others HTTPs request, the seed function will run before the tests.

## Authors

- [@ramonrodgal](https://github.com/ramonrodgal)
- [@JosephCoder76](https://github.com/JosephCoder76)
- [@gosiamaria](https://github.com/gosiamaria)
- [@serenaabbott11](https://github.com/serenaabbott11)
