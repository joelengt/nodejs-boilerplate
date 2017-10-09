import mongoose from 'mongoose'
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
let Currency = mongoose.Types.Currency

let paymentOptions = ['CreditCard', 'DebitCard', 'Cash']
let stateOptions = ['Pendiente', 'EnProceso', 'Terminado']

const orderSchema = new Schema({
  emisor: { type: Number, required: true },
  foods: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'food'
    },
    cant: { type: Number, default: 1 }
  }],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client'
  },
  paymentMethod: { type: String, emun: { values: paymentOptions, messages: 'Option Not valid' } },
  summary: {
    items: { type: Number, default: 0 },
    igv: { type: Currency, default: 0 },
    subtotal: { type: Currency, default: 0 },
    total: { type: Currency, default: 0 }
  },
  state: { type: String, emun: { values: stateOptions, messages: 'Option Not valid' }, default: stateOptions[0] },
  isEnabled: { type: Boolean, default: false },
  fechaCreada: { type: Date, default: Date.now }
})

const orders = mongoose.model('orders', orderSchema)

export default orders
