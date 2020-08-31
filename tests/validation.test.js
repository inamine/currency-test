/* eslint-disable no-undef */
const requestValidation = require('../src/validation')

test('should not accept empty values', () => {
  const { hasErrors, message } = requestValidation({ query:{ } })
  if (!hasErrors || !message) {
    throw new Error('that should return error and message')
  }
})

test('should not accept wrong values', () => {
  const { hasErrors, message } = requestValidation({ query:{ from: 'aue', to: 'uea', value:'ADSSDF', user:'apid' } })
  if (!hasErrors || !message) {
    throw new Error('that should return error and message')
  }
})

