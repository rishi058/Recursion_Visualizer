from collections import defaultdict

#!-------------------- FORMAT HELPERS ----------------------------
br = "\\n"   # for newline

def getVectorToString(v):
    return "[" + ", ".join(map(str, v)) + "]"

def get2DVectorToString(v):
    return "[" + "\\n".join(getVectorToString(row) for row in v) + "]"  

#!---------------- YOUR RECURSIVE FUNCTION ------------------------

def fib(x, ok=0):
    nodeVal = f"fib(x = {x})"
    ok = tv.make(nodeVal, ok)

    if x < 2:
        tv.onHover(str(x), ok)
        return x

    tmp = fib(x - 1, ok) + fib(x - 2, ok)
    tv.onHover(str(tmp), ok)
    return tmp

#!---------------------- MAIN FUNCTION ----------------------------

def run_main():
    # Call your recursive function here
    n = 5
    fib(n)

    # Don't remove the below lines
    tv.buildTree()
    tv.printData()

#!-------------------- HELPER CLASS ------------------------- 

class TreeVisualizer:
    def __init__(self):
        self.nodeCount = 0
        self.nodeToString = {}
        self.nodeToId = {}
        self.nodeToAns = {}
        self.pos = defaultdict(lambda: [0.0, 0.0])
        self.modifier = defaultdict(float)
        self.adj = defaultdict(list)

    def make(self, nodeVal, parent_node):
        self.nodeCount += 1
        new_node = self.nodeCount
        self.nodeToString[new_node] = nodeVal
        self.nodeToId[nodeVal] = new_node
        self.adj[parent_node].append(new_node)
        return new_node

    def onHover(self, nodeVal, node):
        self.nodeToAns[node] = nodeVal

    def buildTree(self):
        for i in range(1, self.nodeCount + 1):
            if not self.adj[i]:
                continue
            for j in range(len(self.adj[i])):
                self.pos[self.adj[i][j]] = [float(j), 0.0]

        for i in range(1, self.nodeCount + 1):
            if not self.adj[i]:
                continue
            first_child = self.adj[i][0]
            last_child = self.adj[i][-1]
            mid = self.pos[i][0] - (self.pos[first_child][0] + self.pos[last_child][0]) / 2.0
            self.modifier[i] = mid

        def updateXY(root, depth, modSum):
            self.pos[root][0] += modSum
            self.pos[root][1] = depth
            for child in self.adj[root]:
                updateXY(child, depth + 1, modSum + self.modifier[root])

        updateXY(1, 0, 0.0)

        minPos = 0.0
        for coords in self.pos.values():
            minPos = min(minPos, coords[0])
        if minPos < 0:
            for k in self.pos:
                self.pos[k][0] -= minPos

        def getRB(node):
            curr = node
            while self.adj[curr]:
                curr = self.adj[curr][-1]
            return self.pos[curr][0]

        def getLB(node):
            curr = node
            while self.adj[curr]:
                curr = self.adj[curr][0]
            return self.pos[curr][0]

        def ShiftSubtree(node, shift):
            self.pos[node][0] += shift
            for child in self.adj[node]:
                ShiftSubtree(child, shift)

        def fixNodeConflicts(root):
            for child in self.adj[root]:
                fixNodeConflicts(child)
            if not self.adj[root]:
                return
            for j in range(len(self.adj[root]) - 1):
                child1 = self.adj[root][j]
                child2 = self.adj[root][j + 1]
                RB_ofLeft = getRB(child1)
                LB_ofRight = getLB(child2)
                if RB_ofLeft >= LB_ofRight:
                    ShiftSubtree(child2, RB_ofLeft - LB_ofRight + 1.0)
            
            first_child = self.adj[root][0]
            last_child = self.adj[root][-1]
            self.pos[root][0] = (self.pos[first_child][0] + self.pos[last_child][0]) / 2.0

        fixNodeConflicts(1)

    def printData(self):
        print("{")
        print('"nodes": [')
        nodes_items = list(self.nodeToString.items())
        for idx, (node_id, label) in enumerate(nodes_items):
            x = self.pos[node_id][0]
            y = self.pos[node_id][1]
            hidden = self.nodeToAns.get(node_id, "")
            line = f'{{ "id": "{node_id}", "position": {{"x": {x}, "y": {y}}}, "data": {{ "label": "{label}", "hidden": "{hidden}"}} }}'
            if idx != len(nodes_items) - 1:
                line += ","
            print(line)
        print("],")
        print('"edges": [')
        tot = 1
        edges = []
        for i in range(1, self.nodeCount + 1):
            for x in self.adj[i]:
                edges.append((i, x))
        
        for idx, (src, tgt) in enumerate(edges):
            line = f'{{ "id": "{tot}", "source": "{src}", "target" : "{tgt}" }}'
            if idx != len(edges) - 1:
                line += ","
            print(line)
            tot += 1
        print("]")
        print("}")

#!----------------------- INITIALIZATION & EXECUTION TRIGGER -----------------------

tv = TreeVisualizer()

if __name__ == "__main__":
    run_main()