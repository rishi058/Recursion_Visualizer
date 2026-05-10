let dp = [];

function fib(x, ok = 0) {
    const nodeVal = `fib(x = ${x})`;
    ok = tv.make(nodeVal, ok);

    if (x < 2) {
        tv.onHover(`From base-case : ${x}`, ok);
        return x;
    }

    // Check if the value has already been computed
    if (dp[x] !== -1) {
        tv.onHover(`From DP : ${dp[x]}`, ok);
        return dp[x];
    }

    const tmp = fib(x - 1, ok) + fib(x - 2, ok);
    dp[x] = tmp; // Cache the computed value
    tv.onHover(String(tmp), ok);
    return tmp;
}

function runMain() {
    // Call your recursive function here
    const n = 5;
    
    // Initialize DP array with -1
    dp = new Array(n + 1).fill(-1);
    
    fib(n);

    // Don't remove the below lines
    tv.buildTree();
    tv.printData();
}