# TEST: CURRENCY CONVERTER

This is admition test for JAYA Company.

## to run local
need to run `npm install` and save in your local folder a `.env` file, with the following variables:
```
PORT=3000 
MONGODB_URL=mongodb://127.0.0.1:27017/currency \\ => database path local
```
`npm run dev` to run locally

## production

https://inamine-currency-test.herokuapp.com/


## paths:


/ 
(root) - Currency converter
expecting the variables:
from - origin currency
to - destination currency
value - value to be converted 
user - a 4 digit number to identify the user 

Example:
http://localhost:3000/?from=brl&to=eur&value=123323.40&user=1234
https://inamine-currency-test.herokuapp.com/?from=brl&to=EUR&value=100&user=0000

/logs 

get the convertion logs.