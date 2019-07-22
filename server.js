const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const url = 'mongodb+srv://admin:admin@cluster0-9doht.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true })
.then(() => {
  console.log('chupelo')
})
.catch((err) => {
  console.log('Error on start: ' + err.stack);
  process.exit(1);
});

var Schema = mongoose.Schema;

  var userSchema = new Schema({
    email:  String,
    password: String,
    username:   String,    
  });

var User = mongoose.model('User', userSchema);

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) return reject(err)
  console.log('Chupelo!')
  })  

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json({ limit: '20mb' }))
  server.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

  server.post('/a', (req, res) => {
    console.log(req.body)

    const newUser = new User(req.body)

    newUser.save()
    
    console.log(newUser)

  })

  server.get('/a', (req, res) => {
    
    User.find().then (
      users => {
        return res.json({ users })
      }
    )

  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`Que es la que hay pa' on http://localhost:${port}`)
  })
})