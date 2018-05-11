var Tests = require('./tests/tests.js')
var tests = new Tests
for (key in tests){
  var testResult = tests[key]()
  var result = testResult ? 'passed' : 'failed'
  console.log(key + ': ' + result)
}
