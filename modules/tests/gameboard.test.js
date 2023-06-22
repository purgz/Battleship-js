const Gameboard = require("../gameboard");
const Ship = require("../ship");

//10 x 10 grid
//ships will all be vertical for now
describe("Placing ships in correct locations",()=>{

    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const ship3 = new Ship(4)
    const gameboard = new Gameboard();

    //assuming the position is determined by the top most cell of the ship
    test("vertical ship cannot be placed on bottom row", ()=>{
        expect(gameboard.placeShip(ship1,[0,0])).toBe(false);
        expect(gameboard.placeShip(ship1,[0,1])).toBe(true);
    })

})