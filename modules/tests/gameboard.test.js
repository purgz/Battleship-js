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
    expect(gameboard.placeShip(0, 1, 1)).toBe(false);
    //expect(gameboard.placeShip(2, 1, 3)).toBe(false);
    //expect(gameboard.placeShip(2, 3, 4)).toBe(true);

    expect(gameboard.placeShip(0, 1, 2)).toBe(true);
    expect(gameboard.board[gameboard.getCellIndex(1, 1)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(1, 2)]).toBe(0);
    expect(gameboard.board[gameboard.getCellIndex(2, 2)]).toBe(-1);
    expect(gameboard.board[gameboard.getCellIndex(1, 3)]).toBe(-1);
  });

  test("placing ship over each other", () => {
    const gameboard = new Gameboard(ships);

    expect(gameboard.placeShip(0, 1, 2)).toBe(true);
    expect(gameboard.placeShip(1, 1, 4)).toBe(false);
    expect(gameboard.placeShip(1, 1, 5)).toBe(true);
    expect(gameboard.board[gameboard.getCellIndex(1,3)]).toBe(1);
    expect(gameboard.board[gameboard.getCellIndex(1,2)]).toBe(0);
  });

  test("placing ship out of bounds",()=>{
    const gameboard = new Gameboard(ships);
    expect(gameboard.placeShip(0, 10, 11)).toBe(false);
    expect(gameboard.placeShip(0, 11, 10)).toBe(false);
    expect(gameboard.placeShip(0, 10, 10)).toBe(true);
  })
});
