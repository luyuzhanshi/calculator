var calculatorApp = new CalculatorApp()
var calculatorUI = {
        display: document.getElementById('display'),
        clearEntry: document.getElementById('clear_entry'),
        clear: document.getElementById('clear'),
        backSpace: document.getElementById('back_space'),
        divide: document.getElementById('divide'),
        seven: document.getElementById('seven'),
        eight: document.getElementById('eight'),
        nine: document.getElementById('nine'),
        multiply: document.getElementById('multiply'),
        four: document.getElementById('four'),
        five: document.getElementById('five'),
        six: document.getElementById('six'),
        subtract: document.getElementById('subtract'),
        one: document.getElementById('one'),
        two: document.getElementById('two'),
        three: document.getElementById('three'),
        add: document.getElementById('add'),
        sessionHistory: document.getElementById('session_history'),
        enterWasPressed: false,
        multipleOperations: false,
        previousButton: '',
        currentButton: '',
        storedNumber: '',
        negativeCounter: 0,
        changedStateInternally: false
}

var appInterface = function(clicked){
        if (clicked){
                var buttonInnerHtml = clicked.currentTarget.innerText || clicked.key
        }
        var buttonIsValid =  buttonInnerHtml == '/' ||  buttonInnerHtml == 'X' ||  buttonInnerHtml == 'x' ||  buttonInnerHtml == '*' ||       buttonInnerHtml == '-' ||       buttonInnerHtml == '+' ||       buttonInnerHtml == '7' ||       buttonInnerHtml == '8' ||       buttonInnerHtml == '9' ||       buttonInnerHtml == '4' ||       buttonInnerHtml == '5' ||       buttonInnerHtml == '6' ||
                             buttonInnerHtml == '1' ||    buttonInnerHtml == '=' || buttonInnerHtml == '2' ||       buttonInnerHtml == '3' ||       buttonInnerHtml == '0' ||       buttonInnerHtml == '.' || buttonInnerHtml == '+/-' || buttonInnerHtml == 'Enter' || buttonInnerHtml == 'Delete' || buttonInnerHtml == 'Backspace' || buttonInnerHtml == 'Escape' ||     buttonInnerHtml == ',' ||
                             buttonInnerHtml == 'back' || buttonInnerHtml == 'CE' || buttonInnerHtml == 'C'
                        if (buttonIsValid){
                                var buttonIsOperator = buttonInnerHtml == '+' ||  buttonInnerHtml == '-' ||  buttonInnerHtml == 'x' ||  buttonInnerHtml == 'X' ||  buttonInnerHtml == '*' ||  buttonInnerHtml == '/'
                                var buttonIsEqualOrEnter = buttonInnerHtml == '=' || buttonInnerHtml == 'Enter'
                                var buttonIsBackspace = buttonInnerHtml == 'Backspace' || buttonInnerHtml == 'back'
                                var buttonIsClearScreen = buttonInnerHtml == 'Delete' || buttonInnerHtml == 'CE'
                                var buttonIsClearAll = buttonInnerHtml == 'Escape' || buttonInnerHtml == 'C'
                                var buttonIsNegative = buttonInnerHtml == '+/-'
                                var buttonIsPeriod = buttonInnerHtml == '.'
                                var buttonIsANumber = !isNaN(parseFloat(buttonInnerHtml))
                                var keyPressedObject = {
                                        buttonIsOperator: buttonIsOperator,
                                        buttonIsEqualOrEnter: buttonIsEqualOrEnter,
                                        buttonIsBackspace: buttonIsBackspace,
                                        buttonIsClearScreen: buttonIsClearScreen,
                                        buttonIsClearAll: buttonIsClearAll,
                                        buttonIsNegative: buttonIsNegative,
                                        buttonIsPeriod: buttonIsPeriod,
                                        buttonIsANumber: buttonIsANumber,
                                        keyPressed: buttonInnerHtml,
                                        clicked: clicked
                                }
                                appRouter(keyPressedObject)
                        }
        }
var appRouter = function(keyInfo){
        var infoObject = {
                keyPressed: keyInfo.keyPressed,
                mainDisplay: calculatorUI.display,
                sessionHistoryDisplay: calculatorUI.sessionHistory,
                updates : {
                        howToUpdate: {main: '', session: ''},
                        appInputs: '',
                        mainUpdates: '',
                        sessionUpdates: ''
                }
        }
        if (keyInfo.buttonIsClearScreen){
                calculatorUI.currentButton = 'ClearScreen'
                handleClearScreen(infoObject)
                calculatorUI.previousButton = 'ClearScreen'
        }

        if (keyInfo.buttonIsClearAll){
                calculatorUI.currentButton = 'ClearAll'
                handleClearAll(infoObject)
                calculatorUI.previousButton = 'ClearAll'
        }

        if (keyInfo.buttonIsBackspace){
                calculatorUI.currentButton = 'Backspace'
                handleBackspaces(infoObject)
                if (calculatorUI.previousButton !== 'Enter'){
                        calculatorUI.previousButton = 'Backspace'
                }
        }

        if (keyInfo.buttonIsEqualOrEnter){
                calculatorUI.currentButton = 'Enter'
                handleEqualOrEnter(infoObject)
                calculatorUI.previousButton = 'Enter'
        }

        if (keyInfo.buttonIsANumber){
                calculatorUI.currentButton = 'Number'
                handleNumbers(infoObject)
                calculatorUI.previousButton = 'Number'
        }

        if (keyInfo.buttonIsPeriod){
                calculatorUI.currentButton = 'Period'
                handlePeriods(infoObject)
                calculatorUI.previousButton = 'Period'
        }

        if (keyInfo.buttonIsOperator){
                calculatorUI.lastNumberEntered = getLastNumberEntered(infoObject.mainDisplay.innerText)
                calculatorUI.currentButton = 'Operator'
                handleOperators(infoObject)
                calculatorUI.previousButton = 'Operator'
        }

        if (keyInfo.buttonIsNegative){
                var isNegative = calculatorUI.negativeCounter % 2 == 0
                calculatorUI.lastNumberEntered = getLastNumberEntered(infoObject.mainDisplay.innerText)
                calculatorUI.currentButton = 'Negative'
                handleNegative(infoObject, isNegative)
                calculatorUI.previousButton = 'Negative'
                calculatorUI.negativeCounter++
        }
}
var handleClearScreen = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['action']
                howToUpdate.session = ['action']
                update.appInputs = 'clear'
                update.mainUpdates = ''
                update.sessionUpdates = info.sessionHistoryDisplay.innerText.slice(0,info.sessionHistoryDisplay.innerText.length - info.mainDisplay.innerText.length)
                processInputs(info)
}

var handleClearAll = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['action']
                howToUpdate.session = ['action']
                update.appInputs = 'clear all'
                update.mainUpdates = ''
                update.sessionUpdates = ''//info.sessionHistoryDisplay.innerText.slice(0,info.sessionHistoryDisplay.innerText.length - info.mainDisplay.innerText.length)
                processInputs(info)
        }

var handleBackspaces = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['action']
                howToUpdate.session = ['action']
                update.appInputs = 'back'
                update.mainUpdates = info.mainDisplay.innerText.slice(0, info.mainDisplay.innerText.length - 1)
                update.sessionUpdates = info.sessionHistoryDisplay.innerText.slice(0,info.sessionHistoryDisplay.innerText.length - 1)
                processInputs(info)
}

var handleEqualOrEnter = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['inputs','results']
                howToUpdate.session = ['inputs', 'results']
                update.appInputs = '='
                update.mainUpdates = ' = '
                update.sessionUpdates += ' = '
                processInputs(info)
}

var handleNumbers = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['inputs']
                howToUpdate.session = ['inputs']
                update.appInputs = info.keyPressed
                update.mainUpdates += info.keyPressed
                update.sessionUpdates += info.keyPressed
                processInputs(info)
}

var handlePeriods = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['inputs']
                howToUpdate.session = ['inputs']
                update.appInputs = info.keyPressed
                update.mainUpdates += info.keyPressed
                update.sessionUpdates += info.keyPressed
                processInputs(info)
}

var handleOperators = function(info){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                if (info.keyPressed == '*'){info.keyPressed = 'x'}
                if (calculatorUI.previousButton == 'Number'  || calculatorUI.previousButton == 'Negative'){
                        howToUpdate.session = ['inputs']
                        howToUpdate.main = ['inputs']
                }
                if (calculatorUI.previousButton == 'Enter' || calculatorUI.previousButton == 'ClearScreen'){
                        howToUpdate.session = ['results','inputs']
                        howToUpdate.main = ['results','inputs']
                }
                update.appInputs = info.keyPressed
                update.mainUpdates += ' ' + info.keyPressed + ' '
                update.sessionUpdates += ' ' + info.keyPressed + ' '
                processInputs(info)
}

var handleNegative = function(info, isNegative){
                var update = info.updates
                var howToUpdate = update.howToUpdate
                howToUpdate.main = ['action']
                howToUpdate.session = ['action']
                if (isNegative){
                        update.appInputs = 'negative'
                        update.mainUpdates = info.mainDisplay.innerText.slice(0, info.mainDisplay.innerText.length - calculatorUI.lastNumberEntered.length) + ' -' + calculatorUI.lastNumberEntered
                        update.sessionUpdates = info.sessionHistoryDisplay.innerText.slice(0,info.sessionHistoryDisplay.innerText.length - calculatorUI.lastNumberEntered.length) + ' -' + calculatorUI.lastNumberEntered
                }
                if (!isNegative){
                        update.appInputs = 'positive'
                        update.mainUpdates = info.mainDisplay.innerText.slice(0, info.mainDisplay.innerText.length - calculatorUI.lastNumberEntered.length-1) + calculatorUI.lastNumberEntered
                        update.sessionUpdates = info.sessionHistoryDisplay.innerText.slice(0, info.sessionHistoryDisplay.innerText.length - calculatorUI.lastNumberEntered.length-1) + calculatorUI.lastNumberEntered
                }
                processInputs(info)
}
var processInputs = function(updateObject){
                var appInputs = updateObject.updates.appInputs
                var mainDisplay = updateObject.mainDisplay
                var sessionDisplay = updateObject.sessionHistoryDisplay
                var howToUpdateMain = updateObject.updates.howToUpdate.main
                var howToUpdateSession = updateObject.updates.howToUpdate.session
                var mainUpdates = updateObject.updates.mainUpdates
                var sessionUpdates = updateObject.updates.sessionUpdates

                calculatorApp.determineAction(appInputs)
                updateDisplay(mainDisplay, howToUpdateMain, mainUpdates, updateObject)
                updateDisplay(sessionDisplay, howToUpdateSession, sessionUpdates, updateObject)
}

var updateDisplay = function(displayToUpdate, howToUpdate, updates, updateObject){
        for (var i = 0; i < howToUpdate.length; i++){

                var currentUpdateType = howToUpdate[i]
                var resultsUpdate = ''

                if (calculatorUI.currentButton == 'ClearScreen' || calculatorUI.previousButton == 'ClearScreen'){
                        resultsUpdate = calculatorUI.storedNumber
                } else resultsUpdate = calculatorApp.result

                if (currentUpdateType == 'results'){
                        updateDisplayWithResults(displayToUpdate, resultsUpdate, updateObject)
                }
                if (currentUpdateType == 'inputs'){
                        var inputUpdate = updates
                        updateDisplayWithInputs(displayToUpdate, inputUpdate, updateObject)
                }
                if (currentUpdateType == 'action'){
                        var actionUpdate = updates
                        updateDisplayWithAction(displayToUpdate, actionUpdate, updateObject)
                }
        }
}

var updateDisplayWithAction = function(displayToUpdate, actionUpdate, updateObject){
                if (displayToUpdate.id == 'display'){
                        if (calculatorUI.previousButton == 'Enter' && calculatorUI.currentButton !== 'ClearAll' && calculatorUI.currentButton !== 'ClearScreen'){
                                displayToUpdate.innerText = displayToUpdate.innerText
                        }
                        if (calculatorUI.previousButton == 'Enter' && calculatorUI.currentButton == 'ClearAll' || calculatorUI.currentButton == 'ClearScreen'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Number'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Negative'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText = actionUpdate
                        }
                }
                if (displayToUpdate.id == 'session_history'){
                        if (calculatorUI.previousButton == 'Enter' && calculatorUI.currentButton !== 'ClearAll' && calculatorUI.currentButton !== 'ClearScreen'){
                                displayToUpdate.innerText = displayToUpdate.innerText
                        }
                        if (calculatorUI.previousButton == 'Enter' && calculatorUI.currentButton == 'ClearAll' || calculatorUI.currentButton == 'ClearScreen'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Number'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Negative'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText = actionUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText = actionUpdate
                        }
                }
}
var updateDisplayWithResults = function(displayToUpdate, resultsUpdate, updateObject){
                if (displayToUpdate.id == 'display'){
                        if (calculatorUI.previousButton == 'Number'){
                                displayToUpdate.innerText += ' ' + resultsUpdate
                                calculatorUI.storedNumber = resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Enter'){
                                displayToUpdate.innerText = resultsUpdate
                                calculatorUI.previousButton = 'Number'
                                calculatorUI.changedStateInternally = true
                                calculatorUI.storedNumber = resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText = resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText += resultsUpdate
                        }
                }
                if (displayToUpdate.id == 'session_history'){
                        if (calculatorUI.previousButton == 'Number'){
                                if (!calculatorUI.changedStateInternally){
                                        displayToUpdate.innerText += ' ' + resultsUpdate
                                        calculatorUI.storedNumber = resultsUpdate
                                }
                                if (calculatorUI.changedStateInternally){
                                        displayToUpdate.innerText += ' | ' + resultsUpdate
                                        calculatorUI.changedStateInternally = false
                                        calculatorUI.storedNumber = resultsUpdate
                                }
                        }
                        if (calculatorUI.previousButton == 'Enter'){
                                displayToUpdate.innerText += ' | ' + resultsUpdate
                                calculatorUI.previousButton = 'Number'
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText += resultsUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText += resultsUpdate
                        }
                }
}

var updateDisplayWithInputs = function(displayToUpdate, inputUpdate, updateObject){
                if (displayToUpdate.id == 'display'){
                        if (calculatorUI.previousButton == 'Enter'){
                                displayToUpdate.innerText = inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Number'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText += ' ' + inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText += '  ' + inputUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Negative'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText += inputUpdate
                        }
                }
                if (displayToUpdate.id == 'session_history'){
                        if (calculatorUI.previousButton == 'Enter'){
                                displayToUpdate.innerText += ' | ' + inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Number'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Operator'){
                                displayToUpdate.innerText += ' ' + inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Backspace'){
                                displayToUpdate.innerText += '  ' + inputUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearAll'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'ClearScreen'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Negative'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == 'Period'){
                                displayToUpdate.innerText += inputUpdate
                        }
                        if (calculatorUI.previousButton == ''){
                                displayToUpdate.innerText += inputUpdate
                        }
                }
}

var getLastNumberEntered = function(stringToCheck){
        var lastNumberEntered = ''
        for (var characterCounter = stringToCheck.length; characterCounter > -1; characterCounter--){
                var character = stringToCheck.charAt(characterCounter)
                var isNotNumber = isNaN(character)
                if (isNotNumber){
                        lastNumberEntered = stringToCheck.slice(characterCounter+1, stringToCheck.length)
                        break
                }
                if (characterCounter == 0){
                        lastNumberEntered = stringToCheck.slice(characterCounter, stringToCheck.length)
                        break
                }
        }
        return lastNumberEntered
}


var listenForButtonClicks = function() {
var buttons = document.getElementsByTagName("button");
  for (var buttonCounter = 0; buttonCounter < buttons.length; buttonCounter++) {
    buttons[buttonCounter].addEventListener("click", appInterface);
  }
}
window.onload = listenForButtonClicks()
document.onkeydown = appInterface
