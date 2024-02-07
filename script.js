let displayArray = Array()
let displayNumber = Number()
const displayCurrent = document.querySelector('.current')

function hoverOnButtons() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((e) => {
        e.addEventListener('mouseover', () => {
            switch (true) {
                case e.classList.contains('number') || e.classList.contains('decimal'):
                    e.style.cssText = "color: #EAE2B7; background-color: #003049; font-weight: bold;"
                    break
                case e.classList.contains('operation'):
                    e.classList.contains('equal') ? 
                    e.style.cssText = "color: #F77F00; background-color: #003049; font-weight: bold;" :
                    e.style.cssText = "color: #EAE2B7; background-color: #F77F00; font-weight: bold;"
                    break
                case e.classList.contains('function'):
                    e.style.cssText = "color: #EAE2B7; background-color: #D62828; font-weight: bold;"
                    break
            }
        })
        e.addEventListener('mouseout', () => e.removeAttribute('style'))
    })
}

function generateOperand() {
    const numberButtons = document.querySelectorAll('.number, .decimal')
    numberButtons.forEach((e) => {
        e.addEventListener('click', () => {
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
    return displayNumber
}

function generateOperation() {
    const operationButtons = document.querySelectorAll('.operation')
    operationButtons.forEach((e) => {
        e.addEventListener('click', () => {
            
        })
    })
}

hoverOnButtons()
generateOperand()