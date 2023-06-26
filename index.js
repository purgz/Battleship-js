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

const rows = document.querySelectorAll(".row");
console.log(rows[0].children);


function renderShips() {
  //i * 10
  for (let i = 0; i < 10; i++) {
    const currentRow = rows[i].children;
  
    for (let j = 0; j < currentRow.length; j++) {
      const value = player.gameboard.board[(9-i) * 10 + j];
      //currentRow[j].textContent = player.gameboard.board[(9-i) * 10 + j]
      if (value !== -1){
        currentRow[j].style.backgroundColor = "green";
      }
    }
  }
}

renderShips();