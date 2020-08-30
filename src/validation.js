const CURRENCIES = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR']

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
  } else if (!CURRENCIES.includes(from.toUpperCase())) {
    hasErrors = true
    message = `invalid code for from: ${from}`
  } else if (!CURRENCIES.includes(to.toUpperCase())) {
    hasErrors = true
    message = ` invalid code for to: ${to}`
  }

  return { hasErrors, message }
}

export default requestValidation
