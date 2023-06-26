//const Gameboard = require("./gameboard");
//const Ship = require("./ship");

class Player {
  constructor(name) {
    this.name = name;
    this.moves = this.populateMoves();
    this.gameboard = new Gameboard([new Ship(2), new Ship(4), new Ship(5)]);
    this.placeShipsRandomly();
  }

  populateMoves() {
    let moves = [];
    for (let i = 0; i < 100; i++) {
      moves.push(i);
    }
    return moves;
  }

  attack(coord, opponent) {
    const cellIndex = this.gameboard.getCellIndex(coord[0], coord[1]);

    if (!this.moves.includes(cellIndex)) {
      return false;
    }

    this.moves.splice(this.moves.indexOf(cellIndex), 1);

    opponent.gameboard.receiveAttack(coord);

    return true;
  }

  placeShipsRandomly() {
    //generate random coordinate
    let coord = [this.getRandomInt(10), this.getRandomInt(10)];
    let vertical = true;

    //horizontal or vertical ship 50/50 chance
    if (Math.random() < 0.5) {
      vertical = false;
    }

    for (let i = 0; i < this.gameboard.ships.length; i++){
      while(!this.gameboard.placeShip(i, coord, vertical)){
        coord = [this.getRandomInt(10), this.getRandomInt(10)];
        vertical = true;
    
        //horizontal or vertical ship 50/50 chance
        if (Math.random() < 0.5) {
          vertical = false;
        }
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
}

//module.exports = Player;
