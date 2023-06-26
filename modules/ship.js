class Ship {
  constructor(length) {
    this.numHits = 0;
    this.length = length;
  }

  //increments the hits on a ship
  hit() {
    this.numHits++;
  }

  //returns true if ship is sunk
  isSunk() {
    if (this.numHits == this.length) {
      return true;
    }
    return false;
  }
}

//module.exports = Ship;
