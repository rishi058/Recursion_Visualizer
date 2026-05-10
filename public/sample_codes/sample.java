import java.util.*;

public class Main {

    // !-------------------- YOUR RECURSIVE FUNCTION & MAIN ----------------------------
    
    static TreeVisualizer tv = new TreeVisualizer();

    public static int fib(int x, int ok) {
        String nodeVal = "fib(x = " + x + ")";
        ok = tv.make(nodeVal, ok);

        if (x < 2) {
            tv.onHover(String.valueOf(x), ok);
            return x;
        }

        int tmp = fib(x - 1, ok) + fib(x - 2, ok);
        tv.onHover(String.valueOf(tmp), ok);
        return tmp;
    }

    // Overloaded method to simulate default argument ok=0
    public static int fib(int x) {
        return fib(x, 0);
    }

    public static void main(String[] args) {
        // Call your recursive function here
        int n = 5;
        fib(n);

        // Don't remove the below lines
        tv.buildTree();
        tv.printData();
    }
}

// !----------------------------------------------------------------------------------
// !-------------------- HELPER CLASSES (HIDDEN AT BOTTOM) -------------------------

class TreeVisualizer {
    private int nodeCount;
    private final Map<Integer, String> nodeToString;
    private final Map<String, Integer> nodeToId;
    private final Map<Integer, String> nodeToAns;
    private final Map<Integer, double[]> pos;
    private final Map<Integer, Double> modifier;
    private final Map<Integer, List<Integer>> adj;

    public TreeVisualizer() {
        this.nodeCount = 0;
        // LinkedHashMap maintains insertion order like Python dicts
        this.nodeToString = new LinkedHashMap<>();
        this.nodeToId = new HashMap<>();
        this.nodeToAns = new HashMap<>();
        this.pos = new LinkedHashMap<>();
        this.modifier = new HashMap<>();
        this.adj = new HashMap<>();
    }

    // Helpers to mimic Python's defaultdict
    private List<Integer> getAdj(int node) {
        return adj.computeIfAbsent(node, k -> new ArrayList<>());
    }

    private double[] getPos(int node) {
        return pos.computeIfAbsent(node, k -> new double[]{0.0, 0.0});
    }

    private double getModifier(int node) {
        return modifier.getOrDefault(node, 0.0);
    }

    public int make(String nodeVal, int parentNode) {
        this.nodeCount++;
        int newNode = this.nodeCount;
        this.nodeToString.put(newNode, nodeVal);
        this.nodeToId.put(nodeVal, newNode);
        
        // Use add() for Java Lists
        getAdj(parentNode).add(newNode);
        
        return newNode;
    }

    public void onHover(String nodeVal, int node) {
        this.nodeToAns.put(node, nodeVal);
    }

    public void buildTree() {
        for (int i = 1; i <= this.nodeCount; i++) {
            List<Integer> children = getAdj(i);
            if (children.isEmpty()) continue;
            for (int j = 0; j < children.size(); j++) {
                getPos(children.get(j))[0] = (double) j;
            }
        }

        for (int i = 1; i <= this.nodeCount; i++) {
            List<Integer> children = getAdj(i);
            if (children.isEmpty()) continue;
            int firstChild = children.get(0);
            int lastChild = children.get(children.size() - 1);
            double mid = getPos(i)[0] - (getPos(firstChild)[0] + getPos(lastChild)[0]) / 2.0;
            modifier.put(i, mid);
        }

        updateXY(1, 0, 0.0);

        double minPos = 0.0;
        for (double[] coords : pos.values()) {
            minPos = Math.min(minPos, coords[0]);
        }
        if (minPos < 0) {
            for (Integer k : pos.keySet()) {
                pos.get(k)[0] -= minPos;
            }
        }

        fixNodeConflicts(1);
    }

    // Recursive helper for buildTree
    private void updateXY(int root, double depth, double modSum) {
        double[] p = getPos(root);
        p[0] += modSum;
        p[1] = depth;
        for (int child : getAdj(root)) {
            updateXY(child, depth + 1.0, modSum + getModifier(root));
        }
    }

    private double getRB(int node) {
        int curr = node;
        while (!getAdj(curr).isEmpty()) {
            List<Integer> children = getAdj(curr);
            curr = children.get(children.size() - 1);
        }
        return getPos(curr)[0];
    }

    private double getLB(int node) {
        int curr = node;
        while (!getAdj(curr).isEmpty()) {
            curr = getAdj(curr).get(0);
        }
        return getPos(curr)[0];
    }

    private void shiftSubtree(int node, double shift) {
        getPos(node)[0] += shift;
        for (int child : getAdj(node)) {
            shiftSubtree(child, shift);
        }
    }

    private void fixNodeConflicts(int root) {
        List<Integer> children = getAdj(root);
        for (int child : children) {
            fixNodeConflicts(child);
        }
        if (children.isEmpty()) return;

        for (int j = 0; j < children.size() - 1; j++) {
            int child1 = children.get(j);
            int child2 = children.get(j + 1);
            double rbOfLeft = getRB(child1);
            double lbOfRight = getLB(child2);
            if (rbOfLeft >= lbOfRight) {
                shiftSubtree(child2, rbOfLeft - lbOfRight + 1.0);
            }
        }

        int firstChild = children.get(0);
        int lastChild = children.get(children.size() - 1);
        getPos(root)[0] = (getPos(firstChild)[0] + getPos(lastChild)[0]) / 2.0;
    }

    public void printData() {
        System.out.println("{");
        System.out.println("  \"nodes\": [");
        
        int idx = 0;
        int totalNodes = nodeToString.size();
        for (Map.Entry<Integer, String> entry : nodeToString.entrySet()) {
            int nodeId = entry.getKey();
            String label = entry.getValue();
            double x = getPos(nodeId)[0];
            double y = getPos(nodeId)[1];
            String hidden = nodeToAns.getOrDefault(nodeId, "");
            
            String line = String.format(Locale.US, "    { \"id\": \"%d\", \"position\": {\"x\": %.1f, \"y\": %.1f}, \"data\": { \"label\": \"%s\", \"hidden\": \"%s\"} }", 
                                        nodeId, x, y, label, hidden);
            
            if (idx != totalNodes - 1) {
                line += ",";
            }
            System.out.println(line);
            idx++;
        }
        
        System.out.println("  ],");
        System.out.println("  \"edges\": [");
        
        int tot = 1;
        List<int[]> edges = new ArrayList<>();
        for (int i = 1; i <= this.nodeCount; i++) {
            for (int x : getAdj(i)) {
                edges.add(new int[]{i, x});
            }
        }

        for (int i = 0; i < edges.size(); i++) {
            int src = edges.get(i)[0];
            int tgt = edges.get(i)[1];
            String line = String.format("    { \"id\": \"%d\", \"source\": \"%d\", \"target\" : \"%d\" }", tot, src, tgt);
            if (i != edges.size() - 1) {
                line += ",";
            }
            System.out.println(line);
            tot++;
        }
        
        System.out.println("  ]");
        System.out.println("}");
    }
}