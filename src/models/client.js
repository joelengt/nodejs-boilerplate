import mongoose from 'mongoose'
const Schema = mongoose.Schema

const clientSchema = new Schema({
  fullName: { type: String },
  dni: { type: String },
  fechaCreada: { type: Date, default: Date.now }
})

const client = mongoose.model('client', clientSchema)

export default client
