const cellElements = document.querySelectorAll("[data-cell]")
const divMessage = document.querySelector("[data-mensage-vencedor]")
const finalTextMessage = document.querySelector("[winner-message-txt]")
const board = document.querySelector("[data-board]")


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let isCircle = true

function mark(e) {
    // mudando Jogador
    isCircle = !isCircle
    let classToAdd = isCircle ? "o" : "x"
    // marcando jogada
    let cell = e.target
    cell.classList.add(classToAdd)
    board.classList.remove("x")
    board.classList.remove("o")
    board.classList.add(classToAdd == "o" ? "x" : "o")
    // conferindo vencedor
    finalMessageWinner(classToAdd)
}


function finalMessageWinner(currentPlayer) {
    if (iswiner(currentPlayer)) {
        divMessage.classList.add("show-winnig-message")
        finalTextMessage.innerHTML = `${currentPlayer.toUpperCase()} Venceu!`
    }
    else if (isDraw()) {
        divMessage.classList.add("show-winnig-message")
        finalTextMessage.innerHTML = `Empate!`
    }
}


function isDraw() {
    return [...cellElements].every((inexCombination) => {
        return inexCombination.classList.contains("x") || inexCombination.classList.contains("o")
    })
}


function iswiner(currentPlayer) {
    return winningCombinations.some((combination) => {
        return combination.every((inexCombination) => {
            return cellElements[inexCombination].classList.contains(currentPlayer)
        })
    })
}


function startGame() {
    // Reset do game
    isCircle = true
    for (const cell of cellElements) {
        cell.classList.remove("x")
        cell.classList.remove("o")
        board.classList.remove("x")
        board.classList.remove("o")
        board.classList.add("x")
        divMessage.classList.remove("show-winnig-message")
        cell.addEventListener("click", mark, { once: true })

    }
}


startGame()