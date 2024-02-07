let displayArray = Array()
let displayNumber = Number()
const displayCurrent = document.querySelector('.current')

function generateOperand() {
    const numberButtons = document.querySelectorAll('.number, .decimal')
    numberButtons.forEach((e) => {
        e.addEventListener('mouseover', () => {
            e.style.cssText = "color: #EAE2B7; background-color: #003049"
        })
        e.addEventListener('mouseout', () => e.removeAttribute('style'))
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

generateOperand()