const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  middleName: String,
  lastName: String,
  day: String,
  month: String,
  year: String,
  mobile: String,
  wado: String,
  panchayat: String,
  taluka: String,
  lastDPL: String,
  gdsClub: String,
  batting: Boolean,
  bowling: Boolean,
  wk: Boolean,
  registrationDate: String,
  photo: String,
  paymentPerson: String
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', playerSchema)
