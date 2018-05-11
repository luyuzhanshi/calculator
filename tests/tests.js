var CalculatorApp = require('../app/app.js')
var CalculatorAppTests = function(){

  this['calculator can store numbers'] = function(){
    var calculatorApp = new CalculatorApp()
    var expected = 0
    calculatorApp.determineAction
    var actual = calculatorApp.storedNumber
    var result = actual == expected
    return result
  }
  
  this['calculator can detect operators'] = function(){
    var calculatorApp = new CalculatorApp()
    var expected = '2'
    calculatorApp.determineAction('2')
    calculatorApp.determineAction('+')
    var actual = calculatorApp.storedNumber
    var result = actual == expected
    return result
  }

}
module.exports = CalculatorAppTests
