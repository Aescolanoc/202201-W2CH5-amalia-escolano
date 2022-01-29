const grid = [
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

function whoIsLive(array) {
  const arrayLife = [];
  let arrayCellsLive = [];
  //Voy a recorrer el array principal para ver quien está vivo
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 1) {
        //guardo las coordenadas de las posiciones vivas
        arrayCellsLive.push(i, j);
        arrayLife.push(arrayCellsLive);
        arrayCellsLive = [];
      }
    }
  }
  gameOfLife(grid, arrayLife);
}

function gameOfLife(mainarray, lifearray) {
  let cellsAliveAround = -1;
  let arrayCellsDead = [];
  const arrayDeath = [];
  let arrayBorn = [];
  let death = false;
  for (let k = 0; k < lifearray.length; k++) {
    x = lifearray[k][0];
    y = lifearray[k][1];
    //SOY LA CELULA Y PREGUNTO SI HAY VECINOS ALREDEDOR
    cellsAliveAround = searchCellsAliveArround(x, y) - 1;
    //Ya he contado los vecinos y ahora vamos a ver si muero o vivo

    if (cellsAliveAround === 2 || cellsAliveAround === 3) {
      //YO COMO CELULA VIVO
      //Pero recorro las celulas muertas de alrededor para ver si nacen
      console.log(x + "-" + y + " vive");
      arrayBorn = newBorn(x, y);
    } else if (cellsAliveAround < 2 || cellsAliveAround > 3) {
      //YO COMO CELULA MUERO PERO AUN NO PORQUE VOY A VER SI ME REPRODUZCO ANTES DE MORIR
      arrayCellsDead.push(x, y);
      arrayDeath.push(arrayCellsDead);
      arrayCellsDead = [];
    }
    cellsAliveAround = -1;
  }
  cellsMustDie(arrayDeath);
  cellsMustBorn(arrayBorn);
}

// gameOfLife(grid);
whoIsLive(grid);
console.log(grid);

function searchCellsAliveArround(ejeX, ejeY) {
  let friends = 0;
  for (i = ejeX - 1; i <= ejeX + 1; i++) {
    for (j = ejeY - 1; j <= ejeY + 1; j++) {
      if (i >= 0 && j >= 0) {
        if (grid[i][j] === 1) friends++;
      }
    }
  }
  return friends;
}

function newBorn(ejeX, ejeY) {
  let newBornFriends = 0;
  let cellToBorn = [];
  let arrayCellsToBorn = [];
  for (let i = ejeX - 1; i <= ejeX + 1; i++) {
    for (let j = ejeY - 1; j <= ejeY + 1; j++) {
      if ((i >= 0 && j >= 0) || (i < grid.legth && j < grid.legth)) {
        //para que no sobrepase el grid
        if (grid[i][j] === 0) {
          x = i;
          y = j;
          newBornFriends = searchCellsAliveArround(i, j);
          if (newBornFriends === 3) {
            //almacenar para que nazca luego
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
    console.log(x + "-" + y + " muere");
  }
}

function cellsMustBorn(arrayOfbirth) {
  for (let i = 0; i < arrayOfbirth.length; i++) {
    let x = arrayOfbirth[i][0];
    let y = arrayOfbirth[i][1];
    grid[x][y] = 1;
    console.log(x + "-" + y + " nace");
  }
}
