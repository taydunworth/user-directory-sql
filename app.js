const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const data = require('data.js')
const pgp = require('pg-promise')()
const database = pgp({ database: 'robot-users' })
const query = 'SELECT * FROM users'
const queryuser = 'SELECT * FROM users WHERE id = ${id}'

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
  // res.render('directory-list', data)
  database.any(query).then(rows => {
    // rows.forEach()
    console.log(rows)
    res.render('directory-list', { users: rows })
  })
})

app.get('/users/:id', (req, res) => {
  const profileData = {
    username: req.params.id
  }

  function findUser(user) {
    return user.username === profileData.username
  }

  const oneUser = data.users.find(findUser)
  res.render('users', oneUser)
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
