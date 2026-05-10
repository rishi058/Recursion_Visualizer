vector<int> dp;

int fib(int x, int ok=0){ 
    string nodeVal = "fib(x = " + to_string(x) + ")";
    tv.make(nodeVal, ok);

    if(x<2){
        tv.onHover("From base-case : " + to_string(x), ok);
        return x;
    } 

    if(dp[x] != -1){tv.onHover("From DP : " + to_string(dp[x]), ok); return dp[x];}

    int tmp = fib(x - 1, ok) + fib(x - 2, ok);
    dp[x] = tmp;
    tv.onHover(to_string(tmp), ok);
    return tmp;
}

//!----------------------------------------------------------------------------------

int main()
{
    //Call you rescursive function here @ top
    int n = 5;
    dp.resize(n+1, -1);
    fib(n);


    //Don't remove the below lines
    tv.buildTree();
    tv.printData();
}