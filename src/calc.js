
const fetch = require('node-fetch')
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest?base=USD'
let rates

const convertInternal = (cFrom, cTo, cValue) => {
    let ratio = (1/rates[cFrom]) * rates[cTo] // here i get a ratio currency using USD as base.
    let converted = ratio * cValue;
  
    console.log( `Ratio for ${cFrom}: ${ratio}` );
    console.log(converted)
  
    return {ratio, converted}
}

const convert = (cFrom, cTo, cValue) => {
    return new Promise( (resolve, reject) => {
        if (!rates) {
            fetch(EXCHANGE_URL)
            .then(res => res.json())
            .then(json => {
                console.log(typeof json)
                rates = json.rates
                resolve(convertInternal(cFrom, cTo, cValue))
            }).catch( (err) => {
                reject();
                throw new Error('Error Fetching currency API')

            }) 
        } else {
            resolve(convertInternal(cFrom, cTo, cValue))
        }
    })
}

module.exports = convert
