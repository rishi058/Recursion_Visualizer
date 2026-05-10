let n;
let board = [];

function is_safe(row, col) {
    let x = row, y = col;
    while (y >= 0) {
        if (board[x][y] === 1) return false;
        y--;
    }

    let xx = row, yy = col;
    // Check upper diagonal
    while (xx >= 0 && yy >= 0) {
        if (board[xx][yy] === 1) return false;
        xx--; yy--;
    }

    let a = row, b = col;
    // Check lower diagonal
    while (a < n && b >= 0) {
        if (board[a][b] === 1) return false;
        a++; b--;
    }

    return true;
}

function solve(col, n, ok = 0) {
    let nodeVal = get2DVectorToString(board);
    tv.make(nodeVal, ok);
    

    if (col === n) {
        tv.onHover("ALL Columns Filled", ok);
        return;
    }

   
    for (let row = 0; row < n; row++) {
        if (is_safe(row, col)) {
            // Place the queen
            board[row][col] = 1;
            solve(col + 1, n, ok);
            // Backtrack
            board[row][col] = 0;
        }
    }

    tv.onHover("Have Empty Columns", ok);
}


function run_main() { 
    n = 4;
    board = [];
    for (let i = 0; i < n; i++) {
        board.push(new Array(n).fill(0));
    }
    solve(0, n); 

    // Build and print tree
    tv.buildTree();
    tv.printData();
}