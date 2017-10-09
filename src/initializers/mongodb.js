import mongoose from 'mongoose'
const debug = require('debug')('assistance-service:initializers:mongodb')
mongoose.Promise = global.Promise

let mongoDB = {
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  database: process.env.MONGODB_DATABASE
}

// connection mongodb
mongoose.connect(`mongodb://${mongoDB.host}:${mongoDB.port}/${mongoDB.database}`, (err) => {
  if (err) return debug('Error to connecto to mongodb', err)
  debug('MongoDB connection success')
})
