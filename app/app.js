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

  this.appSetup(defaultInput)

}

module.exports = CalculatorApp
