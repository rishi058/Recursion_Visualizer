// !-------------------- FORMAT HELPERS ----------------------------

const br = "\\n";  // Use this for new lines

function getVectorToString(v) {
    return "[" + v.join(", ") + "]";
} 

function get2DVectorToString(v) {
    return "[" + v.map(row => getVectorToString(row)).join("\\n") + "]";
}

// !-------------------- YOUR RECURSIVE FUNCTION & MAIN ----------------------------

function fib(x, ok = 0) {
    const nodeVal = `fib(x = ${x})`;
    ok = tv.make(nodeVal, ok);

    if (x < 2) {
        tv.onHover(String(x), ok);
        return x;
    }

    const tmp = fib(x - 1, ok) + fib(x - 2, ok);
    tv.onHover(String(tmp), ok);
    return tmp;
}

function runMain() {
    // Call your recursive function here
    const n = 5;
    fib(n);

    // Don't remove the below lines
    tv.buildTree();
    tv.printData();
}

// !-------------------- HELPER CLASSES (HIDDEN AT BOTTOM) -------------------------

class TreeVisualizer {
    constructor() {
        this.nodeCount = 0;
        this.nodeToString = {};
        this.nodeToId = {};
        this.nodeToAns = {};
        this.pos = {};
        this.modifier = {};
        this.adj = {};
    }

    // Helpers to mimic Python's defaultdict behavior
    getAdj(node) {
        if (!this.adj[node]) this.adj[node] = [];
        return this.adj[node];
    }

    getPos(node) {
        if (!this.pos[node]) this.pos[node] = [0.0, 0.0];
        return this.pos[node];
    }

    getModifier(node) {
        if (this.modifier[node] === undefined) this.modifier[node] = 0.0;
        return this.modifier[node];
    }

    make(nodeVal, parentNode) {
        this.nodeCount += 1;
        const newNode = this.nodeCount;
        this.nodeToString[newNode] = nodeVal;
        this.nodeToId[nodeVal] = newNode;
        this.getAdj(parentNode).push(newNode);
        return newNode;
    }

    onHover(nodeVal, node) {
        this.nodeToAns[node] = nodeVal;
    }

    buildTree() {
        for (let i = 1; i <= this.nodeCount; i++) {
            const children = this.getAdj(i);
            if (children.length === 0) continue;
            for (let j = 0; j < children.length; j++) {
                this.getPos(children[j])[0] = parseFloat(j);
            }
        }

        for (let i = 1; i <= this.nodeCount; i++) {
            const children = this.getAdj(i);
            if (children.length === 0) continue;
            const firstChild = children[0];
            const lastChild = children[children.length - 1];
            const mid = this.getPos(i)[0] - (this.getPos(firstChild)[0] + this.getPos(lastChild)[0]) / 2.0;
            this.modifier[i] = mid;
        }

        const updateXY = (root, depth, modSum) => {
            this.getPos(root)[0] += modSum;
            this.getPos(root)[1] = depth;
            for (const child of this.getAdj(root)) {
                updateXY(child, depth + 1, modSum + this.getModifier(root));
            }
        };

        updateXY(1, 0, 0.0);

        let minPos = 0.0;
        for (const coords of Object.values(this.pos)) {
            minPos = Math.min(minPos, coords[0]);
        }
        if (minPos < 0) {
            for (const k in this.pos) {
                this.pos[k][0] -= minPos;
            }
        }

        const getRB = (node) => {
            let curr = node;
            while (this.getAdj(curr).length > 0) {
                const children = this.getAdj(curr);
                curr = children[children.length - 1];
            }
            return this.getPos(curr)[0];
        };

        const getLB = (node) => {
            let curr = node;
            while (this.getAdj(curr).length > 0) {
                curr = this.getAdj(curr)[0];
            }
            return this.getPos(curr)[0];
        };

        const shiftSubtree = (node, shift) => {
            this.getPos(node)[0] += shift;
            for (const child of this.getAdj(node)) {
                shiftSubtree(child, shift);
            }
        };

        const fixNodeConflicts = (root) => {
            const children = this.getAdj(root);
            for (const child of children) {
                fixNodeConflicts(child);
            }
            if (children.length === 0) return;

            for (let j = 0; j < children.length - 1; j++) {
                const child1 = children[j];
                const child2 = children[j + 1];
                const rbOfLeft = getRB(child1);
                const lbOfRight = getLB(child2);
                if (rbOfLeft >= lbOfRight) {
                    shiftSubtree(child2, rbOfLeft - lbOfRight + 1.0);
                }
            }

            const firstChild = children[0];
            const lastChild = children[children.length - 1];
            this.getPos(root)[0] = (this.getPos(firstChild)[0] + this.getPos(lastChild)[0]) / 2.0;
        };

        fixNodeConflicts(1);
    }

    printData() {
        console.log("{");
        console.log('  "nodes": [');
        const nodesItems = Object.entries(this.nodeToString);
        
        nodesItems.forEach(([nodeId, label], idx) => {
            const x = this.getPos(nodeId)[0];
            const y = this.getPos(nodeId)[1];
            const hidden = this.nodeToAns[nodeId] || "";
            let line = `    { "id": "${nodeId}", "position": {"x": ${x}, "y": ${y}}, "data": { "label": "${label}", "hidden": "${hidden}"} }`;
            if (idx !== nodesItems.length - 1) {
                line += ",";
            }
            console.log(line);
        });
        
        console.log("  ],");
        console.log('  "edges": [');
        
        let tot = 1;
        const edges = [];
        for (let i = 1; i <= this.nodeCount; i++) {
            for (const x of this.getAdj(i)) {
                edges.push([i, x]);
            }
        }

        edges.forEach(([src, tgt], idx) => {
            let line = `    { "id": "${tot}", "source": "${src}", "target" : "${tgt}" }`;
            if (idx !== edges.length - 1) {
                line += ",";
            }
            console.log(line);
            tot += 1;
        });
        
        console.log("  ]");
        console.log("}");
    }
}

//! ---------------------INITIALIZATION & EXECUTION TRIGGER-------------------------

const tv = new TreeVisualizer();

// Standard JS environment execution block equivalent to `if __name__ == "__main__":`
if (typeof require !== 'undefined' && require.main === module) {
    runMain();
} else if (typeof window !== 'undefined') {
    // Fallback if running directly in a browser
    runMain();
} else {
    // Fallback for general execution like quick JS playgrounds
    runMain();
}