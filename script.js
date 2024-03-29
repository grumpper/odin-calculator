let historyArray = []
let displayArray = []
let equalUsed = false
let displayNumber = undefined
const displayCurrent = document.querySelector('.current')
const displayHistory = document.querySelector('.history')

function captureKeyboard() {
    const event = new Event("click");
    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "Digit1":
                document.querySelector('#one').dispatchEvent(event)
                break
            case "Digit2":
                document.querySelector('#two').dispatchEvent(event)
                break
            case "Digit3":
                document.querySelector('#three').dispatchEvent(event)
                break
            case "Digit4":
                document.querySelector('#four').dispatchEvent(event)
                break
            case "Digit5":
                e.shiftKey ?
                    document.querySelector('#percent').dispatchEvent(event) :
                    document.querySelector('#five').dispatchEvent(event)
                break
            case "Digit6":
                document.querySelector('#six').dispatchEvent(event)
                break
            case "Digit7":
                document.querySelector('#seven').dispatchEvent(event)
                break
            case "Digit8":
                e.shiftKey ?
                    document.querySelector('#multiply').dispatchEvent(event) :
                    document.querySelector('#eight').dispatchEvent(event)
                break
            case "Digit9":
                document.querySelector('#nine').dispatchEvent(event)
                break
            case "Digit0":
                document.querySelector('#zero').dispatchEvent(event)
                break
            case "Backspace":
                e.shiftKey || e.metaKey ?
                    document.querySelector('#cancel').dispatchEvent(event) :
                    document.querySelector('#delete').dispatchEvent(event)
                break
            case "Slash":
                document.querySelector('#divide').dispatchEvent(event)
                break
            case "Minus":
                e.shiftKey ?
                    document.querySelector('#sign').dispatchEvent(event) :
                    document.querySelector('#substract').dispatchEvent(event)
                break
            case "Equal":
                e.shiftKey ?
                    document.querySelector('#add').dispatchEvent(event) :
                    document.querySelector('#equal').dispatchEvent(event)
                break
            case "Enter":
                document.querySelector('#equal').dispatchEvent(event)
                break
            case "Period":
                document.querySelector('#decimal').dispatchEvent(event)
                break
        }
    });
}

function hoverOnButtons() {
    /*
    Handles the CSS modifications on hover for each button type
    */
    const buttons = document.querySelectorAll('button')
    buttons.forEach((e) => {
        e.addEventListener('mouseover', () => {
            switch (true) {
                case e.classList.contains('number') || e.classList.contains('decimal'):
                    e.style.cssText = "color: #EAE2B7; background-color: #003049; font-weight: bold;"
                    break
                case e.classList.contains('operation'):
                    e.id === 'equal' ? e.style.cssText = "color: #F77F00; background-color: #003049; font-weight: bold;" : e.style.cssText = "color: #EAE2B7; background-color: #F77F00; font-weight: bold;"
                    break
                case e.classList.contains('function'):
                    e.style.cssText = "color: #EAE2B7; background-color: #D62828; font-weight: bold;"
                    break
            }
        })
        e.addEventListener('mouseout', () => e.removeAttribute('style'))
    })
}

function makeCalculations(a, b, action) {
    switch (action) {
        case "+":
            return a + b
        case "-":
            return a - b
        case "x":
            return a * b
        case "/":
            return a / b
        case "%":
            return Math.abs((a / 100) * b)
    }
}

function operateCalculate() {
    // Handles the functionality of the number buttons + decimal and sign change buttons
    const numberButtons = document.querySelectorAll('.number, .decimal')
    numberButtons.forEach((e) => {
        e.addEventListener('click', () => {
            // Make sure decimal can be put only once per operand and after a number
            // Make sure sign change does nothing if no input yet
            if ((e.textContent === '.' && displayArray.includes('.')) ||
                (e.textContent === '.' && displayArray.join("") === "") ||
                (e.textContent === "+/-" && displayArray.join("") === "")
            ) {
            } else {
                if (e.textContent !== "+/-") {
                    if (equalUsed) {
                        displayArray = []
                        equalUsed = false
                    }
                    displayArray.push(e.textContent)
                }
                displayNumber = parseFloat(displayArray.join(''))
                if (e.textContent === "+/-") {
                    displayNumber = displayNumber * -1
                    displayArray = displayNumber.toString().split("")
                }
                displayCurrent.textContent = displayNumber
                // Make sure operand fits the display if too big
                displayArray.length > 15 ?
                    displayCurrent.style.fontSize = '4.7vmin' :
                    displayCurrent.style.fontSize = '7vmin'
            }
        })
    })

    // Handles the functionality of the operation buttons + percentage and equal buttons
    const operationButtons = document.querySelectorAll(
        '.operation, #percent')
    operationButtons.forEach((e) => {
        e.addEventListener('click', () => {
            if (e.textContent !== "=") {
                equalUsed = false
                let divideByZero = false
                // Until = is clicked obtain the operand from the display
                // Make sure to not add anything to the execution history if display is empty
                let entry = parseFloat(displayCurrent.textContent)
                if (!isNaN(entry) && (typeof historyArray[historyArray.length - 1] !== "number")) {
                    historyArray.push(entry)
                    console.log(`Operand added: ${entry}`)
                }
                // If execution history has 2 operands and operator, perform calculations
                if (historyArray.length === 3) {
                    let result = makeCalculations(
                        historyArray[0], historyArray[2], historyArray[1]
                    )
                    if (historyArray[2] === 0) {
                        displayHistory.textContent = "Don't break the universe !!!"
                        console.log('Calculation result: ERROR')
                        console.log('-----------------------------')
                        result = ""
                        divideByZero = true
                    }
                    // Clean up the history and add only the calculation result
                    historyArray.splice(0, 3)
                    if (result !== "") {
                        historyArray.push(result)
                        console.log(`Calculation result: ${result}`)
                        console.log('-----------------------------')
                        console.log(`Operand added: ${result}`)
                    }
                }
                // If last entry was also operator just replace the operator
                // But make sure history does not start with operator
                if (typeof historyArray[historyArray.length - 1] === "number") {
                    historyArray.push(e.textContent)
                    console.log(`Operator added: ${e.textContent}`)
                } else {
                    if (typeof historyArray[0] === "number") {
                        historyArray.splice(historyArray.length - 1, 1, e.textContent)
                        console.log(`Operator replaced with: ${e.textContent}`)
                    }
                }

                // Make sure to visualize what was calculated on the history display
                if (!divideByZero) {
                    displayHistory.textContent = historyArray.join(" ")
                }
                // Make sure to empty the display and its array
                // to be ready for inputting new operands
                displayCurrent.textContent = ""
                displayArray = []
            } else {
                // If = is clicked, and we have two operands and operator
                // also calculate but:
                // - cleanup the history display and its array
                // - handle the size of the result to fit the display
                // - prepare the result as operand for future operations
                let entry = parseFloat(displayCurrent.textContent)
                if (!isNaN(entry) && (typeof historyArray[historyArray.length - 1] !== "number")) {
                    historyArray.push(entry)
                    console.log(`Operand added: ${entry}`)
                }
                if (historyArray.length === 3) {
                    let result = makeCalculations(
                        historyArray[0],
                        parseFloat(displayCurrent.textContent),
                        historyArray[1])
                    if (parseFloat(displayCurrent.textContent) === 0) {
                        displayHistory.textContent = "Don't break the universe !!!"
                        console.log('Calculation result: ERROR')
                        result = ""
                    } else {
                        displayHistory.textContent = ""
                        console.log(`Calculation result: ${result}`)
                    }
                    displayCurrent.textContent = result
                    console.log('-----------------------------')
                    result.toString().length > 15 ?
                        displayCurrent.style.fontSize = '4.7vmin' :
                        displayCurrent.style.fontSize = '7vmin'
                    historyArray = []
                    displayArray = result.toString().split("")
                    equalUsed = true
                }
            }
        })
    })

    // handles corrections to the input operand
    const deleteButton = document.querySelector('#delete')
    deleteButton.addEventListener('click', () => {
        displayArray = displayCurrent.textContent.toString().split("")
        if (displayArray.length > 0) {
            displayArray.pop()
        }
        displayNumber = parseFloat(displayArray.join(""))
        !isNaN(displayNumber) ?
            displayCurrent.textContent = displayNumber :
            displayCurrent.textContent = ""
    })

    // handles the cancel button
    const cancelButton = document.querySelector('#cancel')
    cancelButton.addEventListener('click', () => {
        displayArray = []
        historyArray = []
        displayNumber = undefined
        displayCurrent.textContent = ""
        displayHistory.textContent = ""
        console.log('-----------------------------')
        console.log(`Clearing everything...`)
        console.log('-----------------------------')
    })
}

hoverOnButtons()
captureKeyboard()
operateCalculate()