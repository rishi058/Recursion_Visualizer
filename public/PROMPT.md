# Code Formatter for Recursion Visualiser

You are given a recursive code snippet (C++/Python/JavaScript/Java).
Your task is to instrument it for tree visualization — **do not alter the original logic**.

## Rules:
1. Add an extra parameter `ok` (default value `0`) to the recursive function. Pass it in every recursive call.
2. At the top of the function, build a string `nodeVal` containing the function name and its parameter values.
3. Call `tv.make(nodeVal, ok)` immediately after — this registers the node for that recursion call.
4. Call `tv.onHover(string-data, ok)` before each `return` to display meaningful data on node hover.
5. Use the predefined `br` macro for newlines inside strings when needed.
6. Use predefined helpers `getVectorToString` / `get2DVectorToString` for collections, or language builtins like `to_string` (C++), `str()` (Python), `String.valueOf()` (Java).

> **NEVER define** `tv`, `br`, `getVectorToString`, or `get2DVectorToString` — treat them as globally available.

## Examples

### C++
```cpp
// BEFORE
int fib(int x){
    if(x<2){return x;}
    if(dp[x] != -1){return dp[x];}
    return dp[x] = fib(x-1) + fib(x-2);
}

// AFTER
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
```


### Python
```py
# BEFORE
def mergeSort(arr, begin, end):
    if begin >= end:
        return
    mid = begin + (end - begin) // 2
    mergeSort(arr, begin, mid)
    mergeSort(arr, mid + 1, end)
    merge(arr, begin, mid, end)

# AFTER
def mergeSort(arr, begin, end, ok=0):
    nodeVal = f"MergeSort( {str(arr[begin:end+1])} )"
    ok = tv.make(nodeVal, ok)

    if begin >= end:
        return
    mid = begin + (end - begin) // 2
    mergeSort(arr, begin, mid, ok)
    mergeSort(arr, mid + 1, end, ok)
    merge(arr, begin, mid, end)

    tv.onHover(str(arr[begin:end+1]), ok)
```


### JavaScript
```js
// BEFORE
function n_queens(col, n) {
    if (col === n) return;
    for (let row = 0; row < n; row++) {
        if (is_safe(row, col)) {
            board[row][col] = 1;
            n_queens(col + 1, n);
            board[row][col] = 0;
        }
    }
}

// AFTER
function n_queens(col, n, ok=0) {
    let nodeVal = get2DVectorToString(board);
    tv.make(nodeVal, ok);

    if (col === n) {
        tv.onHover("All Columns Filled", ok);
        return;
    }

    for (let row = 0; row < n; row++) {
        if (is_safe(row, col)) {
            board[row][col] = 1;
            n_queens(col + 1, n, ok);
            board[row][col] = 0;
        }
    }

    tv.onHover("Has Empty Columns", ok);
}
```


### Java
```java
// BEFORE
public static int fib(int x) {
    if (x < 2) return x;
    if (dp[x] != -1) return dp[x];
    return dp[x] = fib(x - 1) + fib(x - 2);
}

// AFTER
public static int fib(int x, int ok) {
    String nodeVal = "fib(x = " + x + ")";
    ok = tv.make(nodeVal, ok);

    if (x < 2) {
        tv.onHover("From base-case : " + x, ok);
        return x;
    }

    if (dp[x] != -1) {
        tv.onHover("From DP : " + dp[x], ok);
        return dp[x];
    }

    int tmp = fib(x - 1, ok) + fib(x - 2, ok);
    dp[x] = tmp;
    tv.onHover(String.valueOf(tmp), ok);
    return tmp;
}
```