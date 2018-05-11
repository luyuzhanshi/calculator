var CalculatorAppTests = function(){
  
  this['calculator can store numbers'] = function(){
    var calculatorApp = new CalculatorApp()
    var expected = 0
    calculatorApp.determineAction
    var actual = calculatorApp.storedNumber
    var result = actual == expected
    return result
  }

}
