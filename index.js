const board = document.querySelector("#board");

let player = new Player();

console.log(player.gameboard.board);

for (let i = 10; i > 0; i--) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let j = 1; j < 11; j++) {
    let cell = document.createElement("div");
    cell.classList.add("square");
    cell.setAttribute("row", i);
    cell.setAttribute("col", j);

    cell.onclick = function () {
      console.log(cell.getAttribute("row"), cell.getAttribute("col"));
    };

    row.appendChild(cell);
  }
  board.appendChild(row);
}

const cells = document.querySelectorAll(".row");
console.log(cells[0].children)

function renderShips(){
  for (let i = 0; i < player.gameboard.board.length; i++){

  }
}