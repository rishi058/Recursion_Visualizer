import java.util.Arrays;

public class Main {

    static TreeVisualizer tv = new TreeVisualizer();
    static int[] dp; 

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

    public static int fib(int x) {
        return fib(x, 0);
    }

    public static void main(String[] args) {
        int n = 5;
        
        dp = new int[n + 1];
        Arrays.fill(dp, -1);
        
        fib(n);

        tv.buildTree();
        tv.printData();
    }
}