let historyArray = []
let displayArray = []
let displayNumber = undefined
const displayCurrent = document.querySelector('.current')
const displayHistory = document.querySelector('.history')

function hoverOnButtons() {
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
        case "=":
            return a
    }
}

function main() {
    const numberButtons = document.querySelectorAll('.number, .decimal')
    numberButtons.forEach((e) => {
        e.addEventListener('click', () => {
            // handle operands
            if (e.textContent === '.' && displayArray.includes('.')) {
            } else {
                displayArray.push(e.textContent)
                displayNumber = parseFloat(displayArray.join(''))
                displayCurrent.textContent = displayNumber
                if (displayArray.length > 15) {
                    displayCurrent.style.fontSize = '4.7svh'
                }
            }
        })
    })

    const operationButtons = document.querySelectorAll('.operation')
    operationButtons.forEach((e) => {
        e.addEventListener('click', () => {
            console.log(historyArray.join(" "))
            if (displayCurrent.textContent !== "") {
                historyArray.push(parseFloat(displayCurrent.textContent))
            } else {
                historyArray.push("")
            }
            console.log(historyArray.join(" "))
            if (historyArray.length === 3) {
                let result = makeCalculations(historyArray[0], historyArray[2], historyArray[1])
                historyArray = [result]
            }
            historyArray.push(e.textContent)
            if (e.textContent === "=") {
                displayHistory.textContent = ''
                displayCurrent.textContent = historyArray[0]
            } else {
                displayHistory.textContent = historyArray.join(" ")
                displayCurrent.textContent = ''
            }
            displayArray = []
        })
    })
}

hoverOnButtons()
main()