const yourBoard = document.querySelector("#board");
const aiBoard = document.querySelector("#aiBoard");
const boardSize = 10; //currently only supports boardsize of 10 as the player and gameboard classes are hardcoded to 10x10

const player = new Player();
const player2 = new Player();

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
          currentCell.getAttribute("row"),
          currentCell.getAttribute("col"),
        ];

        if (!player.repeatedAttack(attackCoords)){
          attack(attackCoords);
        } else {
          console.log("INVALID MOVE");
        }
      };
    }
  }
}

//colors the cells when attacked and checks for invalid attack
function attack(coords) {
  const rows = aiBoard.children;
  const row = rows[boardSize - coords[0]].children;
  const cell = row[coords[1]-1];
 
  if (player.attack(coords, player2)) {
    cell.style.backgroundColor = "green";
    
  } else{
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

createBoardGrid(yourBoard);
createBoardGrid(aiBoard);
addEventListeners();

renderOwnBoard();
