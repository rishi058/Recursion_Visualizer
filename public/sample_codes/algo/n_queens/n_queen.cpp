int n;
vector<vector<int>> board;

bool is_safe(int row, int col){

    int x = row, y = col;
    //check in that row for above col 
    while(y>=0){
        if(board[x][y]==1){return false;}
        y--;
    }

    int xx = row, yy = col;
    //check for diagonal
    while(xx>=0 && yy>=0){
        if(board[xx][yy]==1){return false;}
        xx--; yy--;
    }

    int a = row, b = col;
    //check for diagonal
    while(a<n && b>=0){
        if(board[a][b]==1){return false;}
        a++; b--;
    }

    return true;

} 

void solve(int col, int n, int ok=0){  
    string nodeVal = get2DVectorToString(board);
    tv.make(nodeVal, ok);
    
    // base case (if every col is filled)
    if(col == n){
        tv.onHover("ALL Columns Filled", ok);
        return;
    }

    //put queen in every row of diff col..
    for(int row = 0; row<n; row++){
        if(is_safe(row,col)){

            // if placing queen is safe
            board[row][col] = 1;

            solve(col+1, n, ok);

            //backtrack
            board[row][col] = 0;
        }
    }

    tv.onHover("Have Empty Columns", ok);
}  
//!----------------------------------------------------------------------------------

int main()
{
    //Call you rescursive function here @ top
    n = 4;

    for(int i=0; i<n; i++){
        vector<int> temp(n, 0);
        board.push_back(temp);
    }

    solve(0, n); 

    //Don't remove the below lines
    tv.buildTree();
    tv.printData();
}