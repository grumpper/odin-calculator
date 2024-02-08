let historyArray = []
let displayArray = []
let displayNumber = undefined
const displayCurrent = document.querySelector('.current')
const displayHistory = document.querySelector('.history')

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
            return (a / 100) * b
    }
}

function main() {
    // Handles the functionality of the number buttons + decimal and sign change buttons
    const numberButtons = document.querySelectorAll('.number, .decimal')
    numberButtons.forEach((e) => {
        e.addEventListener('click', () => {
            // Make sure decimal can be put only once per operand
            // Make sure sign change does nothing if no input yet
            if ((e.textContent === '.' && displayArray.includes('.')) ||
                (e.textContent === "+/-" && displayArray.join("") === "")
            ) {
            } else {
                if (e.textContent !== "+/-") {
                    displayArray.push(e.textContent)
                }
                displayNumber = parseFloat(displayArray.join(''))
                if (e.textContent === "+/-") {
                    displayNumber = displayNumber * -1
                    displayArray = displayNumber.toString().split("")
                }
                displayCurrent.textContent = displayNumber
                // Make sure operand fits the display if too big
                if (displayArray.length > 15) {
                    displayCurrent.style.fontSize = '4.7svh'
                }
            }
        })
    })

    // Handles the functionality of the operation buttons + percentage and equal buttons
    const operationButtons = document.querySelectorAll(
        '.operation, #percent')
    operationButtons.forEach((e) => {
        e.addEventListener('click', () => {
            if (e.textContent !== "=") {
                // Until = is clicked obtain the operand from the display
                // Make sure to not add anything to the execution history if display is empty
                let entry = parseFloat(displayCurrent.textContent)
                if (!isNaN(entry)) {
                    historyArray.push(entry)
                }
                // If execution history has 2 operands and operator, perform calculations
                if (historyArray.length === 3) {
                    let result = makeCalculations(historyArray[0], historyArray[2], historyArray[1])
                    // Clean up the history and add only the calculation result
                    historyArray.splice(0, 3)
                    historyArray.push(result)
                }
                // If last entry was also operator just replace the operator
                if (typeof historyArray[historyArray.length - 1] === "number") {
                    console.log(historyArray[historyArray.length - 1])
                    historyArray.push(e.textContent)
                } else {
                    historyArray.splice(historyArray.length - 1, 1, e.textContent)
                }

                // Make sure to visualize what was calculated on the history display
                displayHistory.textContent = historyArray.join(" ")
                // Make sure to empty the display and its array
                // to be ready for inputting new operands
                displayCurrent.textContent = ""
                displayArray = []
            } else {
                // If = is clicked also calculate but:
                // - cleanup the history display and its array
                // - handle the size of the result to fit the display
                // - prepare the result as operand for future operations
                let result = makeCalculations(
                    historyArray[0],
                    parseFloat(displayCurrent.textContent),
                    historyArray[1])
                displayHistory.textContent = ""
                displayCurrent.textContent = result
                if (result.toString().length > 15) {
                    displayCurrent.style.fontSize = '4.7svh'
                }
                historyArray = []
                displayArray = result.toString().split("")
            }
        })
    })
}

hoverOnButtons()
main()