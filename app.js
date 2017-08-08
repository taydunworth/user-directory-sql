const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const pgp = require('pg-promise')()
// Declare existence of SQL database
const database = pgp({ database: 'robot-users' })
const query = 'SELECT * FROM users'

// SQL Table Creation
// CREATE TABLE users (
  // "id" SERIAL PRIMARY KEY,
  // "username" VARCHAR(100) NOT NULL,
  // "imageurl" VARCHAR(100) NULL,
  // "email" VARCHAR(100) NULL,
  // "university" VARCHAR(100) NULL,
  // "street_number" VARCHAR(100) NULL,
  // "address" VARCHAR(100) NULL,
  // "city" VARCHAR(100) NULL,
  // "state" VARCHAR(100) NULL,
  // "job" VARCHAR(100) NULL,
  // "company" VARCHAR(100) NULL,
  // "postal_code" VARCHAR(100) NULL,
  // "year_built" VARCHAR(100) NULL,
  // "next_service_date" VARCHAR(100) NULL,
  // "is_active" BOOLEAN
// )

const app = express()

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  database.any(query).then(rows => {
    res.render('directory-list', { users: rows })
  })
})

app.get('/users/:id', (req, res) => {
  database.any(query).then(rows => {
    const profileData = {
      userID: req.params.id
    }

    function findUser(rows) {
      return rows.id === profileData.userID
    }

    const oneUser = database.users.find(findUser)
    res.render('users', { oneUser, users: rows })
  })
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
