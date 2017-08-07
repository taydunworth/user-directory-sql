const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const data = require('data.js')

const app = express()

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  res.render('directory-list', data)
})

app.get('/users/:username', (req, res) => {
  const profileData = {
    username: req.params.username
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
