const express = require('express')

const requestValidation = require('./validation')
const convert = require('./calc')

const port = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {

    let { hasErrors, message } = requestValidation(req)

    if (hasErrors) {
        res.status(400)
        return res.send({ error: message })
    }

    let from = req.query.from.toUpperCase()
    let to = req.query.to.toUpperCase()
    let value = req.query.value.replace(/,/gi, '.')

    convert(from, to, value)
        .then(({ ratio, converted }) => {

            let initalValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: from }).format(value);
            let convertedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: to }).format(converted);

            res.send({
                from, to, initalValue, convertedValue, ratio
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
