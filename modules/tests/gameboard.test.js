const Gameboard = require("../gameboard");
const Ship = require("../ship");

test("grid coord to array conversion", () => {
  const gameboard = new Gameboard();
  expect(gameboard.getCellIndex(1, 1)).toBe(0);
  expect(gameboard.getCellIndex(10, 10)).toBe(99);
});

//10 x 10 grid
//ships will all be vertical for now
describe("Placing ships in correct locations", () => {
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  const ship3 = new Ship(4);
  const ships = [ship1, ship2, ship3];

  //assuming the position is determined by the top most cell of the ship
  test("vertical ship cannot be placed on bottom row", () => {
    const gameboard = new Gameboard(ships);
    expect(gameboard.placeShip(0, [1, 1], true)).toBe(false);
    //expect(gameboard.placeShip(2, 1, 3)).toBe(false);
    //expect(gameboard.placeShip(2, 3, 4)).toBe(true);

    expect(gameboard.placeShip(0, [1, 2], true)).toBe(true);
    expect(gameboard.board[gameboard.getCellIndex(1, 1)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(1, 2)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(2, 2)]).toBe(-1);
    expect(gameboard.board[gameboard.getCellIndex(1, 3)]).toBe(-1);
  });

  test("placing ship over each other", () => {
    const gameboard = new Gameboard(ships);

    expect(gameboard.placeShip(0, [1, 2], true)).toBe(true);
    expect(gameboard.placeShip(1, [1, 4], true)).toBe(false);
    expect(gameboard.placeShip(1, [1, 5], true)).toBe(true);
    expect(gameboard.board[gameboard.getCellIndex(1, 3)]).toBe(1);
    expect(gameboard.board[gameboard.getCellIndex(1, 2)]).toBe(0);
  });

  test("placing ship out of bounds", () => {
    const gameboard = new Gameboard(ships);
    expect(gameboard.placeShip(0, [10, 11], true)).toBe(false);
    expect(gameboard.placeShip(0, [11, 10], true)).toBe(false);
    expect(gameboard.placeShip(0, [10, 10], true)).toBe(true);
  });

  test("Placing ship horizontally correct", () => {
    const gameboard = new Gameboard(ships);
    expect(gameboard.placeShip(0, [1, 1], false)).toBe(true);
    expect(gameboard.board[gameboard.getCellIndex(1, 1)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(2, 1)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(3, 1)]).toBe(-1);

    expect(gameboard.placeShip(1, [1, 1], false)).toBe(false);
    expect(gameboard.placeShip(0, [10, 1], false)).toBe(false);
    expect(gameboard.placeShip(0, [9, 1], false)).toBe(true);
  });
});

describe("recieve attack function", () => {
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  const ship3 = new Ship(4);
  const ships = [ship1, ship2, ship3];
  const gameboard = new Gameboard(ships);

  gameboard.placeShip(0, [9, 1], false);
  gameboard.placeShip(1, [3, 3], true);
  gameboard.placeShip(2, [1, 7], false);

  test("Testing simple hit and miss", () => {
    //testing miss
    expect(gameboard.receiveAttack([1, 1])).toBe(false);

    //testing sinking of ship 0
    expect(gameboard.receiveAttack([9, 1])).toBe(true);
    expect(gameboard.ships[0].isSunk()).toBe(false);
    expect(gameboard.receiveAttack([10, 1])).toBe(true);
    expect(gameboard.ships[0].numHits).toBe(2);
    expect(gameboard.ships[0].isSunk()).toBe(true);
  });
});

describe("test all ships sunk method", () => {
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  const ship3 = new Ship(4);
  const ships = [ship1, ship2, ship3];
  const gameboard = new Gameboard(ships);

  gameboard.placeShip(0, [9, 1], false);
  gameboard.placeShip(1, [3, 3], true);
  gameboard.placeShip(2, [1, 7], false);

  gameboard.receiveAttack([9, 1]);
  gameboard.receiveAttack([10, 1]);
  gameboard.receiveAttack([3, 3]);
  gameboard.receiveAttack([3, 2]);
  gameboard.receiveAttack([3, 1]);
  gameboard.receiveAttack([1, 7]);
  gameboard.receiveAttack([2, 7]);
  gameboard.receiveAttack([3, 7]);
  gameboard.receiveAttack([4, 7]);

  test("have all 3 ships been sunk", () => {
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
