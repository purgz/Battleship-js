const Player = require("../player");

test("ship initialization", () => {
  const player = new Player("henry");
  const player2 = new Player("player 2");

  expect(player.gameboard.ships[1].length).toBe(2);

  expect(player.attack([1, 1], player2)).toBe(true);
  expect(player.attack([1, 1], player2)).toBe(false);
  expect(player2.gameboard.misses.includes(0)).toBe(true);

  player.placeShipsRandomly();
});
