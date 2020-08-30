
const fetch = require('node-fetch')
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest?base=USD'
let rates
let lastUpdate

const convertInternal = (cFrom, cTo, cValue) => {
    let ratio = (1/rates[cFrom]) * rates[cTo] // here i get a ratio currency using USD as base.
    let converted = ratio * cValue;
  
    console.log( `Ratio for ${cFrom}: ${ratio}` );
    console.log(converted)
  
    return {ratio, converted}
}

const convert = (cFrom, cTo, cValue) => {
    return new Promise( (resolve, reject) => {
        let diff = (new Date() - lastUpdate)/1000/(60) // calc time for the last update. Get a new update if the last update was one hour older 
        console.log(`Last Update was ${diff} ago`)
        if (!rates || diff > 1) {
            fetch(EXCHANGE_URL)
            .then(res => res.json())
            .then(json => {
                console.log(typeof json)
                rates = json.rates
                lastUpdate = new Date()
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
