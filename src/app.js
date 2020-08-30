const express = require('express')

const requestValidation = require('./validation').default
const convert = require('./calc')

const port = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  const { hasErrors, message } = requestValidation(req)

  if (hasErrors) {
    res.status(400)
    return res.send({ error: message })
  }

  let { query: { from, to, value, user } } = req
  from = from.toUpperCase()
  to = to.toUpperCase()
  value = value.replace(/,/gi, '.')

  convert(from, to, value)
    .then(({ ratio, converted }) => {
      const initalValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: from }).format(value)
      const convertedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: to }).format(converted)

      res.send({
        from, to, initalValue, convertedValue, ratio, user
      })
    })
})

// Handle 404
app.use((req, res, next) => {
  res.status(404)
  res.send('404: File Not Found')
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
