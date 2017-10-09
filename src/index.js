import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import methodOverride from 'method-override'
import path from 'path'
import multer from 'multer'

require('rootpath')()

var debug = require('debug')('assistance-service:index')
const app = express()
const server = require('http').Server(app)
// const io = require('socket.io')(server)
const port = process.env.PORT

// Allow Cors Header
function allowCrossTokenHeader (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next()
}

debug('PATH >><', path.join(__dirname, '../uploads'))

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, '../views'))

// Config Server
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(allowCrossTokenHeader)
app.use(multer({dest: path.join(__dirname, '../uploads/face')}))

require('./initializers/routes')(app)

// Server Listen
server.listen(port, (err) => {
  if (err) return debug(`Error: Server not started - ${err}`)
  debug(`Server listing on port ${port}`)
})
