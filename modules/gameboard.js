class Gameboard {
  constructor(ships) {
    this.ships = ships;
    this.board = new Array(100);
    this.board.fill(-1);
  }

  getCellIndex(hor, ver) {
    return (ver - 1) * 10 + (hor - 1);
  }

  placeShip(shipIndex, coord, isShipVertical) {
    //puts the index of ship in the board array
    const ship = this.ships[shipIndex];
    if (
      ship.length <= coord[1] &&
      coord[0] <= 10 &&
      coord[1] <= 10 &&
      coord[0] >= 1 &&
      coord[1] >= 1
    ) {
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
    }
    //if the ship will not fit on the board
    return false;
  }
}

module.exports = Gameboard;
