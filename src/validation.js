const currencyCodes = require('./data/currency-codes')

const requestValidation = (req) => {
  let hasErrors = false
  let message = ''
  const { query: { from = '', to = '', value = '', user = '' } } = req

  if (!from) {
    hasErrors = true
    message = 'You must provide a value for from'
  } else if (!to) {
    hasErrors = true
    message = 'You must provide a value for to'
  } else if (!value) {
    hasErrors = true
    message = 'You must provide a value to convert'
  } else if (!user) {
    hasErrors = true
    message = 'You must provide a user to use this API'
  } else if (user.length !== 4 || !user.match(/\d{4}/)) {
    hasErrors = true
    message = 'The User ID must have 4 digits'
  } else if (isNaN(value.replace(/,/gi, '.'))) {
    hasErrors = true
    message = `You must provide a valid value to convert: ${value}`
  } else if (!currencyCodes.includes(from.toUpperCase())) {
    hasErrors = true
    message = `invalid code for from: ${from}`
  } else if (!currencyCodes.includes(to.toUpperCase())) {
    hasErrors = true
    message = ` invalid code for to: ${to}`
  }

  return { hasErrors, message }
}

module.exports = requestValidation
