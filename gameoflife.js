const grid = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

export function whoIsLive(array) {
  const arrayLife = [];
  let arrayCellsLive = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 1) {
        arrayCellsLive.push(i, j);
        arrayLife.push(arrayCellsLive);
        arrayCellsLive = [];
      }
    }
  }
  gameOfLife(arrayLife);
  return arrayLife;
}

export function gameOfLife(lifeArray) {
  let cellsAliveAround = -1;
  let arrayCellsDead = [];
  const arrayDeath = [];
  let arrayBorn = [];
  for (let k = 0; k < lifeArray.length; k++) {
    let x = lifeArray[k][0];
    let y = lifeArray[k][1];
    cellsAliveAround = searchCellsAliveArround(x, y) - 1;
    if (cellsAliveAround === 2 || cellsAliveAround === 3) {
      arrayBorn = newBorn(x, y);
    } else if (cellsAliveAround < 2 || cellsAliveAround > 3) {
      arrayCellsDead.push(x, y);
      arrayDeath.push(arrayCellsDead);
      arrayCellsDead = [];
    }
    cellsAliveAround = -1;
  }
  cellsMustDie(arrayDeath);
  cellsMustBorn(arrayBorn);
}

export function searchCellsAliveArround(ejeX, ejeY) {
  let friends = 0;
  for (let i = ejeX - 1; i <= ejeX + 1; i++) {
    for (let j = ejeY - 1; j <= ejeY + 1; j++) {
      if ((i >= 0 && j >= 0) || (i < grid.legth && j < grid.length)) {
        if (grid[i][j] === 1) friends++;
      }
    }
  }
  return friends;
}

export function newBorn(ejeX, ejeY) {
  let newBornFriends = 0;
  let cellToBorn = [];
  let arrayCellsToBorn = [];
  for (let i = ejeX - 1; i <= ejeX + 1; i++) {
    for (let j = ejeY - 1; j <= ejeY + 1; j++) {
      if ((i >= 0 && j >= 0) || (i < grid.legth && j < grid.legth)) {
        if (grid[i][j] === 0) {
          let x = i;
          let y = j;
          newBornFriends = searchCellsAliveArround(x, y);
          if (newBornFriends === 3) {
            cellToBorn.push(i, j);
            arrayCellsToBorn.push(cellToBorn);
            cellToBorn = [];
          }
        }
      }
    }
  }
  return arrayCellsToBorn;
}

function cellsMustDie(arrayOfDeath) {
  for (let i = 0; i < arrayOfDeath.length; i++) {
    let x = arrayOfDeath[i][0];
    let y = arrayOfDeath[i][1];
    grid[x][y] = 0;
  }
}

function cellsMustBorn(arrayOfbirth) {
  for (let i = 0; i < arrayOfbirth.length; i++) {
    let x = arrayOfbirth[i][0];
    let y = arrayOfbirth[i][1];
    grid[x][y] = 1;
  }
}

whoIsLive(grid);
console.log(grid);
