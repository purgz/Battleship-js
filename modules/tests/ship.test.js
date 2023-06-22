const Ship = require("../ship");

test("Constructing ship", () => {
  const ship = new Ship(4);
  expect(ship.isSunk()).toBe(false);
  expect(ship.length).toBe(4);
  expect(ship.numHits).toBe(0);
});
