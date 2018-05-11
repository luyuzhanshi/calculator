  var CalculatorApp = function(defaultInput){
    this.appSetup = function(defaultInput){
    if(!defaultInput){
      defaultInput = {}
    }
      if (!defaultInput.storedNumber){
        defaultInput.storedNumber = ''
      }
      this.storedNumber = defaultInput.storedNumber
    }
    this.determineAction = function(input){
      var inputIsNotNumber = input == 'x' || input == '+' || input == '/' || input == '-' || input == '='
      if (inputIsNotNumber){

      }
      if (!inputIsNotNumber){
        this.storedNumber += input
      }
    }
    this.appSetup(defaultInput)
  }

module.exports = CalculatorApp
