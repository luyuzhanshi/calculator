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
    if (!defaultInput.operator){
      defaultInput.operator = ''
    }
    if (!defaultInput.result){
      defaultInput.result = ''
    }
    this.storedNumber = defaultInput.storedNumber
    this.leftOperand = defaultInput.leftOperand
    this.rightOperand = defaultInput.rightOperand
    this.operator = defaultInput.operator
    this.result = defaultInput.result
    this.multipleOperations = false
  }
  this.determineAction = function(input){
    var inputIsNotNumber = input == 'x' || input == '+' || input == '/' || input == '-' || input == '='
    var inputIsEquals = input == '='

    if (inputIsNotNumber){

      if (!inputIsEquals){
        if (this.multipleOperations){
          this.rightOperand = this.storedNumber
          this.calculateResult(this.operator)
          this.leftOperand = this.result
          this.operator = input
          this.storedNumber = ''
        }
        if (!this.multipleOperations){
          this.leftOperand = this.storedNumber
          this.operator = input
          this.storedNumber = ''
          this.multipleOperations = true
        }
      }

      if (inputIsEquals){
        this.rightOperand = this.storedNumber
        this.storedNumber = ''
        this.calculateResult(this.operator)
      }

    }

    if (!inputIsNotNumber){
      this.storedNumber += input
    }

  }
  this.calculateResult = function(operator){
  var leftOperand = parseFloat(this.leftOperand)
  var rightOperand = parseFloat(this.rightOperand)
  var result = ''
  if (operator == 'x'){
    result = leftOperand * rightOperand
  }
  if (operator == '-'){
    result = leftOperand - rightOperand
  }
  if (operator == '+'){
    result = leftOperand + rightOperand
  }
  if (operator == '/'){
    result = leftOperand / rightOperand
  }
  this.result = result.toString()
}
  this.appSetup(defaultInput)
}
module.exports = CalculatorApp
