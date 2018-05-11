var CalculatorApp = function(defaultInput){
    this.appSetup = function(defaultInput){
    if(!defaultInput){
      defaultInput = {}
    }
      if (!defaultInput.storedNumber){
        defaultInput.storedNumber = ''
      }
      if (!defaultInput.leftOperand){
        defaultInput.leftOperand = ''
      }
      if (!defaultInput.rightOperand){
        defaultInput.rightOperand = ''
      }
      this.storedNumber = defaultInput.storedNumber
      this.leftOperand = defaultInput.leftOperand
      this.rightOperand = defaultInput.rightOperand
    }
    this.determineAction = function(input){
      var inputIsNotNumber = input == 'x' || input == '+' || input == '/' || input == '-' || input == '='
      var inputIsEquals = input == '='

      if (inputIsNotNumber){

        if (!inputIsEquals){
          this.leftOperand = this.storedNumber
          this.storedNumber = ''
        }

        if (inputIsEquals){
          this.rightOperand = this.storedNumber
          this.storedNumber = ''
        }

      }

      if (!inputIsNotNumber){
        this.storedNumber += input
      }

    }
    this.appSetup(defaultInput)
  }
module.exports = CalculatorApp
