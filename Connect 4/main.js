let grid = [];
let columns = 7;
let rows = 6;

let yellowlocations = [[6,'4']];
let redlocations = [];

let yellowturn = true;
//populate the grid
for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
        //<div id="0-0"></div>
        let tile = document.createElement("div");
        tile.className = "special";
        tile.id = (r).toString() + "-" + (c).toString();
        tile.addEventListener("click", clickTile);
        document.getElementById("test-grid").append(tile);
        row.push(tile);
    }
    grid.push(row);
}
// Red and Yellow locations, check down the rows line to see if its inside the 
// red/yellow locations array, if so, push another location(one row above)
// into the location arrays. check to see if it was 4 in a row. if not
// push the bottow row and current column into the array so you have a coin.
// somehwere in this we need a turn indicator and a way to swap them(automatically)
function clickTile(e){
    let pos = []
    pos = e.target.id.split("-")
    if(yellowturn){
        dropCoin(yellowturn,pos[1])
        yellowturn = false;
    }else {
        dropCoin(yellowturn,pos[1])
        yellowturn = true;
    }
   
}

function dropCoin(turn, column) {
  if (turn) {
      turn = "y";
    } else {
      turn = "r";
    }

  let row = 5;
  //run row to find when it ends
  while (row >= 0 && (grid[row][column].classList.contains("yellow") || grid[row][column].classList.contains('red'))){
    row--;
  }

  if (row < 0) {
    //no valid spots in that row
  } else {
    //we know where to place the thing (row, col)
    if(turn === 'y'){
      grid[row][column].classList.add("yellow");
    }else{
      grid[row][column].classList.add("red");
    }
  }
  checkWin();
}

function checkWin(){
   // horizontal
   for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++){
       if (grid[r][c] != 'special') {
           if (grid[r][c] == grid[r][c+1] && grid[r][c+1] == grid[r][c+2] && grid[r][c+2] == grid[r][c+3]) {
               setWinner(r, c);
               return;
           }
       }
    }
}

// vertical
for (let c = 0; c < columns; c++) {
   for (let r = 0; r < rows - 3; r++) {
       if (grid[r][c] != 'special') {
           if (grid[r][c] == grid[r+1][c] && grid[r+1][c] == grid[r+2][c] && grid[r+2][c] == grid[r+3][c]) {
               setWinner(r, c);
               return;
           }
       }
   }
}

// anti diagonal
for (let r = 0; r < rows - 3; r++) {
   for (let c = 0; c < columns - 3; c++) {
       if (grid[r][c] != 'special') {
           if (grid[r][c] == grid[r+1][c+1] && grid[r+1][c+1] == grid[r+2][c+2] && grid[r+2][c+2] == grid[r+3][c+3]) {
               setWinner(r, c);
               return;
           }
       }
   }
}

// diagonal
for (let r = 3; r < rows; r++) {
   for (let c = 0; c < columns - 3; c++) {
       if (grid[r][c] != 'special') {
           if (grid[r][c] == grid[r-1][c+1] && grid[r-1][c+1] == grid[r-2][c+2] && grid[r-2][c+2] == grid[r-3][c+3]) {
               setWinner(r, c);
               return;
           }
       }
   }
}
}

function setWinner(r,c){
  let win = document.getElementById('win')
  if(grid[r][c].classList.contains("yellow")){
    win.innerHTML = "Yellow wins"
  }else{
    win.innerHTML = "Red wins"
  }

}