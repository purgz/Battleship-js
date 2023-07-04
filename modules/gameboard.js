class Gameboard {
  constructor(ships) {
    this.ships = ships;
    this.board = new Array(100);
    this.board.fill(-1);
    this.misses = [];
  }

  getCellIndex(hor, ver) {
    return (ver - 1) * 10 + (hor - 1);
  }

  getCoordFromIndex(index) {
    return [(index % 10) + 1, Math.floor(index / 10) + 1];
  }

  placeShip(shipIndex, coord, isShipVertical) {
    //puts the index of ship in the board array
    const ship = this.ships[shipIndex];
    
    //check if valid coords
    if (coord[0] <= 10 && coord[1] <= 10 && coord[0] >= 1 && coord[1] >= 1) {
      //check vertical case
      if (isShipVertical && ship.length <= coord[1]) {
        
        //check if a ship is already placed in this location
        for (let i = 0; i < ship.length; i++) {
          if (this.board[this.getCellIndex(coord[0], coord[1] - i)] !== -1) {
            return false;
          }
        }
        //if no ship then place ship
        for (let i = 0; i < ship.length; i++) {
          this.board[this.getCellIndex(coord[0], coord[1] - i)] = shipIndex;
        }
        return true;
      } else if (!isShipVertical && ship.length <= 11 - coord[0]) {
        
        //handle horizontal ship placement
        //11 - x gives the horizontal space
        for (let i = 0; i < ship.length; i++) {
          if (this.board[this.getCellIndex(coord[0] + i, coord[1])] !== -1) {
            return false;
          }
        }

        for (let i = 0; i < ship.length; i++) {
          console.log(coord[0] , coord[1])
          console.log(this.getCellIndex(coord[0] + i, coord[1]))
          
          this.board[this.getCellIndex(coord[0] + i, coord[1])] = shipIndex;
        }
        return true;
      }
    }

    //if the ship will not fit on the board
    return false;
  }

  receiveAttack(coord) {
    //convert into cell index
    const cellIndex = this.getCellIndex(coord[0], coord[1]);
    if (this.misses.includes(cellIndex)) {
      return false;
    }

    if (this.board[cellIndex] == -1) {
      //no hit
      this.misses.push(cellIndex);
      return false;
    }

    const hitShipIndex = this.board[cellIndex];

    this.ships[hitShipIndex].hit();

    //returns true if hit otherwise false
    return true;
  }

  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }

    //all ships sunk
    return true;
  }
}

//module.exports = Gameboard;
