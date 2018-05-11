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
    var expected = '+'
    calculatorApp.determineAction('2')
    calculatorApp.determineAction('+')
    var actual = calculatorApp.operator
    var result = actual == expected
    return result
  }

  this['calculator can detect equals'] = function(){
      var calculatorApp = new CalculatorApp()
      var expected = '2'
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('+')
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('=')
      var actual = calculatorApp.rightOperand
      var result = actual == expected
      return result
  }

  this['calculator can perform calculations'] = function(){
      var calculatorApp = new CalculatorApp()
      var expected = '5'
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('+')
      calculatorApp.determineAction('3')
      calculatorApp.determineAction('=')
      var actual = calculatorApp.result
      var result = actual == expected
      return result
  }
 this['calculator can chain calculations'] = function(){
      var calculatorApp = new CalculatorApp()
      var expected = '10'
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('+')
      calculatorApp.determineAction('3')
      calculatorApp.determineAction('x')
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('=')
      var actual = calculatorApp.result
      var result = actual == expected
      return result
  }

 this['calculator can chain calculations 2'] = function(){
      var calculatorApp = new CalculatorApp()
      var expected = '9'
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('+')
      calculatorApp.determineAction('3')
      calculatorApp.determineAction('x')
      calculatorApp.determineAction('2')
      calculatorApp.determineAction('-')
      calculatorApp.determineAction('1')
      calculatorApp.determineAction('=')
      var actual = calculatorApp.result
      var result = actual == expected
      return result
  }

  this['calculator can detect negative Numbers'] = function(){
       var calculatorApp = new CalculatorApp()
       var expected = '-10'
       calculatorApp.determineAction('2')
       calculatorApp.determineAction('+')
       calculatorApp.determineAction('3')
       calculatorApp.determineAction('x')
       calculatorApp.determineAction('2')
       calculatorApp.determineAction('negative')
       calculatorApp.determineAction('=')
       var actual = calculatorApp.result
       var result = actual == expected
       return result
  }

   this['calculator can detect backspaces'] = function(){
        var calculatorApp = new CalculatorApp()
        var expected = '10'
        calculatorApp.determineAction('2')
        calculatorApp.determineAction('+')
        calculatorApp.determineAction('3')
        calculatorApp.determineAction('x')
        calculatorApp.determineAction('22')
        calculatorApp.determineAction('back')
        calculatorApp.determineAction('=')
        var actual = calculatorApp.result
        var result = actual == expected
        return result
    }

    this['calculator can detect clear current input'] = function(){
       var calculatorApp = new CalculatorApp()
       var expected = 'NaN'
       calculatorApp.determineAction('2')
       calculatorApp.determineAction('+')
       calculatorApp.determineAction('3')
       calculatorApp.determineAction('x')
       calculatorApp.determineAction('22')
       calculatorApp.determineAction('clear')
       calculatorApp.determineAction('=')
       var actual = calculatorApp.result
       var result = actual == expected
       debugger
       return result
     }
   this['calculator can detect clear all input'] = function(){
        var calculatorApp = new CalculatorApp()
        var expected = '7'
        calculatorApp.determineAction('2')
        calculatorApp.determineAction('+')
        calculatorApp.determineAction('33')
        calculatorApp.determineAction('clear all')
        calculatorApp.determineAction('5')
        calculatorApp.determineAction('=')
        var actual = calculatorApp.result
        var result = actual == expected
        return result
    }
}
module.exports = CalculatorAppTests
