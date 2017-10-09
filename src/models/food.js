import mongoose from 'mongoose'
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
let Currency = mongoose.Types.Currency

const foodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Currency, default: 0, required: true },
  _price: { type: String },
  photo: { type: String, required: true },
  isEnabled: { type: Boolean, default: false },
  fechaCreada: { type: Date, default: Date.now }
})

// foodSchema.path('_price').get((num) => {
//   return (num / 100).toFixed(2)
// })

const food = mongoose.model('food', foodSchema)

export default food
