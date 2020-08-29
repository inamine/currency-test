const fetch = require('node-fetch')
const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest?base=USD'
let rates



const getData = () => {
    fetch(EXCHANGE_URL)
    .then(res => res.json())
    .then(json => {
        console.log(typeof json)
        rates = json.rates
        convert('EUR', 'BRL', 50)
    }); 
}

const convert = (cFrom, cTo, cValue) => {
    let ratio = (1/rates[cFrom]) * rates[cTo] // here i get a ratio currency using USD as base.
    let value = ratio * cValue;
    console.log( `Ratio for ${cFrom}: ${ratio}` );
    console.log(value)
    console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: cTo }).format(value));
}

getData();