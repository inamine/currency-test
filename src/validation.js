const CURRENCIES = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"]

const requestValidation = (req) => {
    let hasErrors = false
    let message = ''

    if (!req.query.from) {
        hasErrors = true
        message = 'You must provide a value for from'
    } else if (!req.query.to) {
        hasErrors = true
        message = 'You must provide a value for to'
    } else if (!req.query.value) {
        hasErrors = true
        message = 'You must provide a value to convert'
    } else if (isNaN(req.query.value.replace(/,/gi, '.'))) {
        hasErrors = true
        message = `You must provide a valid value to convert: ${req.query.value}`
    } else if (!CURRENCIES.includes(req.query.from.toUpperCase())) {
        hasErrors = true
        message = `invalid code for from: ${req.query.from}`
    } else if (!CURRENCIES.includes(req.query.to.toUpperCase())) {
        hasErrors = true
        message = ` invalid code for to: ${req.query.to}`
    }

    return { hasErrors, message }
}

module.exports = requestValidation