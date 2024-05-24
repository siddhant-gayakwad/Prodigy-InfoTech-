document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    const popup = document.createElement("div");
    popup.classList.add("popup");
    document.body.appendChild(popup);

    let currentPlayer = "X";
    let board = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);

    function handleCellClick(e) {
        const index = e.target.dataset.index;

        if (!board[index] && !checkWin() && !checkDraw()) {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            e.target.classList.add(currentPlayer);

            if (checkWin()) {
                showMessage(`${currentPlayer} wins!`);
            } else if (checkDraw()) {
                showMessage("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function checkDraw() {
        return board.every(cell => cell !== null);
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
        currentPlayer = "X";
        message.textContent = "";
        popup.classList.remove("show");
    }

    function showMessage(msg) {
        message.textContent = msg;
        popup.textContent = msg;
        popup.classList.add("show");
        setTimeout(() => {
            popup.classList.remove("show");
        }, 2000);
    }
});
