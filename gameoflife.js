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
  for (let element of lifeArray) {
    let x = element[0];
    let y = element[1];
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
      if (i >= 0 && i < grid.length && j >= 0 && j < grid.length) {
        if (grid[i][j] === 1) friends++;
      }
    }
  }
  return friends;
}

export function newBorn(ejeX, ejeY) {
  let arrayCellsToBorn = [];
  let cellToBorn;
  for (let i = ejeX - 1; i <= ejeX + 1; i++) {
    for (let j = ejeY - 1; j <= ejeY + 1; j++) {
      if (i >= 0 && i < grid.length && j >= 0 && j < grid.length) {
        let x = i;
        let y = j;
        cellToBorn = saveNewBorn(x, y);
        if (!cellToBorn === false) {
          arrayCellsToBorn.push(cellToBorn);
          cellToBorn = [];
        }
      }
    }
  }
  return arrayCellsToBorn;
}

function saveNewBorn(xLine, yLine) {
  let newBornFriends = 0;
  let cellToBorn = [];
  if (grid[xLine][yLine] === 0) {
    let a = xLine;
    let b = yLine;
    newBornFriends = searchCellsAliveArround(a, b);
    if (newBornFriends === 3) {
      cellToBorn.push(xLine, yLine);
      return cellToBorn;
    }
  }
}

function cellsMustDie(arrayOfDeath) {
  for (let element of arrayOfDeath) {
    let x = element[0];
    let y = element[1];
    grid[x][y] = 0;
  }
}

function cellsMustBorn(arrayOfbirth) {
  for (let element of arrayOfbirth) {
    let x = element[0];
    let y = element[1];
    grid[x][y] = 1;
  }
}

whoIsLive(grid);
console.log(grid);
