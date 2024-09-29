<div class="container">
      <h1>TIC TAC TOE</h1>
      <div class="form">
        <label for="player_1">Player 1</label>
        <input type="text" id="player_1" placeholder="enter name" />
        <label for="player_2">Player 2</label>
        <input type="text" id="player_2" placeholder="enter name" />
        <button id="submit">Start Game</button>
      </div>

      <div id="game-board" class="hidden">
        <h1>Tic Tac Toe</h1>
        <div class="message" id="turn-message"></div>
        <div class="board">
          <div id="1" class="cell"></div>
          <div id="2" class="cell"></div>
          <div id="3" class="cell"></div>
          <div id="4" class="cell"></div>
          <div id="5" class="cell"></div>
          <div id="6" class="cell"></div>
          <div id="7" class="cell"></div>
          <div id="8" class="cell"></div>
          <div id="9" class="cell"></div>
        </div>
      </div>
    </div>

    <script>
      let player_1 = "";
      let player_2 = "";
      let currentPlayer = "";
      let gameBoard = Array(9).fill(null);
      let isGameOver = false;

      // Start game button click event
      document.getElementById("submit").addEventListener("click", function () {
        player1 = document.getElementById("player_1").value;
        player2 = document.getElementById("player_2").value;
        if (player1 && player2) {
          document.querySelector(".form").classList.add("hidden");
          document.getElementById("game-board").classList.remove("hidden");
          currentPlayer = player1;
          document.getElementById(
            "turn-message"
          ).textContent = `${currentPlayer}, you're up`;
        }
      });

      // Cell click event
      document.querySelectorAll(".cell").forEach((cell) => {
        cell.addEventListener("click", function () {
          if (isGameOver) return;

          const cellIndex = this.id - 1;
          if (!gameBoard[cellIndex]) {
            gameBoard[cellIndex] = currentPlayer === player1 ? "X" : "O";
            this.textContent = gameBoard[cellIndex];
            this.classList.add("taken");

            if (checkWinner()) {
              document.getElementById(
                "turn-message"
              ).textContent = `${currentPlayer}, congratulations you won!`;
              isGameOver = true;
            } else if (gameBoard.every((cell) => cell !== null)) {
              document.getElementById("turn-message").textContent =
                "It's a draw!";
              isGameOver = true;
            } else {
              currentPlayer = currentPlayer === player_1 ? player_2 : player_1;
              document.getElementById(
                "turn-message"
              ).textContent = `${currentPlayer}, you're up`;
            }
          }
        });
      });

      // Check for a winner
      function checkWinner() {
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

        return winningCombinations.some((combination) => {
          return combination.every((index) => {
            return gameBoard[index] === (currentPlayer === player_1 ? "X" : "O");
          });
        });
      }