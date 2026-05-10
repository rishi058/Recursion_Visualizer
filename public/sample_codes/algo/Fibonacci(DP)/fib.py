# Global DP array
dp = []

def fib(x, ok=0):
    nodeVal = f"fib(x = {x})"
    ok = tv.make(nodeVal, ok)

    if x < 2:
        tv.onHover(f"From base-case : {x}", ok)
        return x

    # Check if the value has already been computed
    if dp[x] != -1:
        tv.onHover(f"From DP : {dp[x]}", ok)
        return dp[x]

    tmp = fib(x - 1, ok) + fib(x - 2, ok)
    dp[x] = tmp # Cache the computed value
    tv.onHover(str(tmp), ok)
    return tmp

# !---------------------- MAIN FUNCTION ----------------------------

def run_main():
    global dp
    n = 5
    
    # Initialize DP array with -1
    dp = [-1] * (n + 1)
    
    # Call your recursive function here
    fib(n)

    # Don't remove the below lines
    tv.buildTree()
    tv.printData()