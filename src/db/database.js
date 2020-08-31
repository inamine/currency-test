const mongoose = require('mongoose')
const currencyCodes = require('../data/currency-codes')
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
let isConnected = false

mongoose.connect('mongodb://127.0.0.1:27017/currency', options)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB is Connected!')
  // we're connected!
  isConnected = true
})

const Log = mongoose.model('Log', {
  from: {
    type: String,
    required: true,
    validate (value) {
      if (!currencyCodes.includes(value)) {
        throw new Error('Invalid Code for FROM:', value)
      }
    }
  },
  to: {
    type: String,
    required: true,
    validate (value) {
      if (!currencyCodes.includes(value)) {
        throw new Error('Invalid Code for FROM:', value)
      }
    }
  },
  initalValue: {
    type: String,
    required: true
  },
  convertedValue: {
    type: String,
    required: true
  },
  ratio: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true,
    validate(value) {
      // validar o user para 4 digitos
    }
  },
  date: {
    type: Date,
    required: true
  }
})

const registerLog = (logObj) => {
  return new Promise((resolve, reject) => {
    if (!isConnected) {
      return reject(new Error('DB not connected'))
    }
    const currentLog = new Log(logObj)
    currentLog.save()
      .then(() => {
        console.log('Log Registered')
        resolve()
      }).catch((error) => {
        console.log('RegisterLog Error:', error)
        reject(error)
      })
  })
}

module.exports = registerLog
