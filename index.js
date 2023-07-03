const yourBoard = document.querySelector("#board");
const aiBoard = document.querySelector("#aiBoard");
const boardSize = 10; //currently only supports boardsize of 10 as the player and gameboard classes are hardcoded to 10x10

const player = new Player("player 1");
const player2 = new Player("player 2");
let winner;

function createBoardGrid(board) {
  for (let i = boardSize; i > 0; i--) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 1; j < boardSize + 1; j++) {
      let cell = document.createElement("div");
      cell.classList.add("square");
      cell.setAttribute("row", i);
      cell.setAttribute("col", j);

      /*
      cell.onclick = function () {
        console.log(cell.getAttribute("row"), cell.getAttribute("col"));
      };
      */

      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function addEventListeners() {
  const rows = aiBoard.children;

  for (let i = 0; i < boardSize; i++) {
    const currentRow = rows[i].children;

    for (let j = 0; j < currentRow.length; j++) {
      const currentCell = currentRow[j];
      currentCell.onclick = function () {
        const attackCoords = [
          currentCell.getAttribute("col"),
          currentCell.getAttribute("row")
        ];

        if (!player.repeatedAttack(attackCoords)){

          console.log(attackCoords)
          //user move
          attack(attackCoords);

          if (isGameOver()){
            console.log("GAME OVER !!!!");
            console.log(winner.name)
            alert("Game over");
            return;
          }

          //ai move
          const move = player2.moves[player2.getRandomInt(player2.moves.length - 1)];
          const moveCoord = player2.gameboard.getCoordFromIndex(move);
          console.log("Computer attacking: " + moveCoord + " " + move);
          player2.attack(moveCoord, player);
          const rows = yourBoard.children;
          const row = rows[boardSize - moveCoord[1]].children;
          const cell = row[moveCoord[0] - 1];
          
          cell.textContent = "X";

          if (isGameOver()){
            console.log("GAME OVER !!!!");
            console.log(winner.name)
            alert("GAME OVER")
            return;
          }
            
        } else{
          console.log("invalid");
        }
      };
    }
  }
}

//colors the cells when attacked and checks for invalid attack
function attack(coords) {
  const rows = aiBoard.children;
 
  const row = rows[boardSize - coords[1]].children;
  const cell = row[coords[0] - 1];

  if (player.attack(coords, player2)) {
    cell.style.backgroundColor = "green";
  } else {
    cell.style.backgroundColor = "red";
  }
}

function renderOwnBoard() {
  const rows = document.querySelectorAll(".row");
  //i * 10
  for (let i = 0; i < boardSize; i++) {
    const currentRow = rows[i].children;

    for (let j = 0; j < currentRow.length; j++) {
      const value = player.gameboard.board[(boardSize - 1 - i) * boardSize + j];
      //currentRow[j].textContent = player.gameboard.board[(9-i) * 10 + j]
      if (value !== -1) {
        currentRow[j].style.backgroundColor = "green";
      }
    }
  }
}

function isGameOver() {
  if (player.gameboard.allShipsSunk()) {
    winner = player2;
    return true;
  } else if (player2.gameboard.allShipsSunk()) {
    winner = player;
    return true;
  }
  //game is not over yet
  return false;
}

createBoardGrid(yourBoard);
createBoardGrid(aiBoard);
addEventListeners();
renderOwnBoard();

//add game loop

