class Gameboard {
  constructor(player) {
    this.player = player;
    this.ships = [];
    this.board = new Array(64);
  }

  getCellIndex(hor, ver) {
    return (ver - 1) * 10 + (hor - 1);
  }
}

module.exports = Gameboard;
