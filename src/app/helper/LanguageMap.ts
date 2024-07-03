interface Language {
  id: number;
  defaultCode: string;
}

export interface LanguageMap {
  [key: string]: Language;
}

export const languageMapData: LanguageMap = {
  "cpp": {
    id: 54,
    defaultCode: 
    "#include <bits/stdc++.h>\n"
    + "using namespace std;\n\n"
    + "#define int long long\n"
    + "#define RISHI ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);\n"
    + "#define br \"\\\\n\"\n\n"
    + "const int N = 1e5+5;\n"
    + "int nodeCount = 0;\n"
    + "map<int,string> nodeToString;\n"
    + "map<string,int> nodeToId;\n"
    + "map<int,string> nodeToAns;\n"
    + "map<int,pair<float,float>> pos;\n"
    + "float modifier[N];\n"
    + "vector<int> adj[N];\n\n"
    + "int addNode(string node);\n"
    + "void addEdge(int par, int child);\n"
    + "string getVectorToString(vector<int> &v);\n"
    + "string get2DVectorToString(vector<vector<int>> &v);\n\n"
    + "//!-----------PASTE YOUR RECURSIVE FUNCTION HERE---------------\n\n"
    + "int fib(int x, int par) {    // THIS IS A EXAMPLE FUNCTION [YOU CAN REPLACE IT WITH YOUR FUNCTION]\n"
    + "    string node = \"fib(x = \" + to_string(x) + \")\";\n"
    + "    int currentId = addNode(node);\n"
    + "    addEdge(par, currentId);\n\n"
    + "    if (x == 0) {\n"
    + "        nodeToAns[currentId] = \"0\";\n"
    + "        return 0;\n"
    + "    }\n"
    + "    if (x == 1) {\n"
    + "        nodeToAns[currentId] = \"1\";\n"
    + "        return 1;\n"
    + "    }\n\n"
    + "    int tmp = fib(x-1, currentId) + fib(x-2, currentId);\n"
    + "    nodeToAns[currentId] = to_string(tmp) + br + to_string(tmp);\n"
    + "    return tmp;\n"
    + "}\n\n"
    + "//!------------------------------------------------------------\n"
    + "void initializeX(int n);\n"
    + "void updateXY(int root, int d, float modSum);\n"
    + "void makePositive();\n"
    + "void fixNodeConflicts(int root);\n"
    + "void assignCoordinates(int n){\n"
    + "    initializeX(n);\n"
    + "    updateXY(1,0,0);\n"
    + "    makePositive();\n"
    + "    fixNodeConflicts(1);\n"
    + "}\n"
    + "//!------------------------------------------------------------\n\n"
    + "int32_t main()\n"
    + "{\n"
    + "    RISHI\n"
    + "    // call your function here\n"
    + "    int n = 5;\n"
    + "    fib(n, 0);  // pass 0 as par\n"
    + "    \n\n"
    + "    // Don't remove it.\n"
    + "    assignCoordinates(nodeCount);  // Must be called after recursion.\n"
    + "    writeData();\n"
    + "}\n\n"
    + "//!------------------------------------------------------------------------------------------------------------------------------\n\n"
    + "int addNode(string node) {\n"
    + "    nodeCount++;\n"
    + "    nodeToString[nodeCount] = node;\n"
    + "    nodeToId[node] = nodeCount;\n"
    + "    return nodeToId[node];\n"
    + "}\n\n"
    + "void addEdge(int par, int child) {\n"
    + "    adj[par].push_back(child);\n"
    + "}\n\n"
    + "//!------------------------------------------------------------------------------------------------------------------------------\n\n"
    + "void initializeX(int n){ // n - total nodes\n"
    + "    for(int i=1; i<=n; i++){\n"
    + "        if(adj[i].empty()){continue;}\n\n"
    + "        for(int j=0; j<adj[i].size(); j++){\n"
    + "            pos[adj[i][j]] = {j,0};         // add 2*j, 3*j, for some edge cases\n"
    + "        }\n"
    + "    }\n\n"
    + "    for(int i=1; i<=n; i++){\n"
    + "        if(adj[i].empty()){continue;}\n"
    + "        // computing & assigning modifier [orgX - desiredX]\n"
    + "        float mid = pos[i].first - (pos[adj[i][0]].first + pos[adj[i].back()].first)/2.00;\n"
    + "        modifier[i] = mid;\n"
    + "    }\n"
    + "}\n\n"
    + "void updateXY(int root=1, int depth=0, float modSum=0){\n"
    + "    pos[root].first += modSum;\n"
    + "    pos[root].second = depth;\n"
    + "    for(int child : adj[root]){\n"
    + "        updateXY(child, depth+1, modSum + modifier[root]);\n"
    + "    }\n"
    + "}\n\n"
    + "void makePositive(){\n"
    + "    float minPos = 0;\n"
    + "    for(auto &it : pos){\n"
    + "        minPos = min(minPos, it.second.first);\n"
    + "    }\n\n"
    + "    if(minPos < 0){\n"
    + "        for(auto &it : pos){\n"
    + "            it.second.first -= minPos;\n"
    + "        }\n"
    + "    }\n"
    + "}\n\n"
    + "float getRB(int node){\n"
    + "    while(!adj[node].empty()){\n"
    + "        node = adj[node].back();\n"
    + "    }\n"
    + "    return pos[node].first;\n"
    + "}\n\n"
    + "float getLB(int node){\n"
    + "    while(!adj[node].empty()){\n"
    + "        node = adj[node][0];\n"
    + "    }\n"
    + "    return pos[node].first;\n"
    + "}\n\n"
    + "void ShiftSubtree(int node, float shift){\n"
    + "    pos[node].first += shift;\n"
    + "    for(int child : adj[node]){\n"
    + "        ShiftSubtree(child, shift);\n"
    + "    }\n"
    + "}\n\n"
    + "void fixNodeConflicts(int root=1){\n"
    + "    for(int child : adj[root]){\n"
    + "        fixNodeConflicts(child);   // doing opr from child to par - IMP\n"
    + "    }\n\n"
    + "    if(adj[root].empty()){return;}\n\n"
    + "    for(int j=0; j<adj[root].size()-1 ; j++){\n"
    + "        int child1 = adj[root][j];\n"
    + "        int child2 = adj[root][j+1];\n\n"
    + "        float RB_ofLeft = getRB(child1);   // rightmost bottom node of left subtree\n"
    + "        float LB_ofRight = getLB(child2);  // leftmost bottom node of right subtree\n"
    + "        if(RB_ofLeft >= LB_ofRight){                              // add = for some edge cases\n"
    + "            ShiftSubtree(child2, RB_ofLeft - LB_ofRight + 1);      // add RB-LB+1/+2... for some edge cases\n"
    + "        }\n"
    + "    }\n\n"
    + "    pos[root].first = (pos[adj[root][0]].first + pos[adj[root].back()].first)/2.00;\n"
    + "}\n\n"
    + "//!------------------------------------------------------------------------------------------------------------------------------\n\n"
    + "// { \"id\": \"1\", \"source\": \"1\", \"target\": \"2\" }\n"
    + "//{ \"id\": \"1\", \"position\": { \"x\": 0, \"y\": 0 }, \"data\": { \"label\": \"1\", \"hidden\": \"xtra val\" } },\n"
    + "void writeData(){\n"
    + "    cout<<\"{\\n\";\n"
    + "    cout<<\"\\\"nodes\\\": [\\n\";\n"
    + "    for(auto it = nodeToString.begin(); it!=nodeToString.end(); it++){\n"
    + "        cout<<\"{ \\\"id\\\": \\\"\"<<it->first<<\"\\\",\";\n"
    + "        cout<<\" \\\"position\\\": {\\\"x\\\": \"<<pos[it->first].first<<\", \";\n"
    + "        cout<<\"\\\"y\\\": \"<<pos[it->first].second<<\"}, \";\n"
    + "        cout<<\"\\\"data\\\": { \\\"label\\\": \\\"\"<<it->second<<\"\\\", \\\"hidden\\\": \\\"\"<<nodeToAns[it->first]<<\"\\\"} }\";\n"
    + "        auto next_it = next(it);\n"
    + "        if(next_it != nodeToString.end()){cout << \",\";}\n"
    + "        cout << \"\\n\";\n"
    + "    }\n"
    + "    cout<<\"],\\n\";\n"
    + "    cout<<\"\\\"edges\\\": [\\n\";\n"
    + "    int tot = 1;\n"
    + "    for(int i=1; i<=nodeCount; i++){\n"
    + "        for(int x : adj[i]){\n"
    + "            cout<<\"{ \\\"id\\\": \\\"\"<<tot<<\"\\\", \";\n"
    + "            cout<<\"\\\"source\\\": \";\n"
    + "            cout<<\"\\\"\"<<i<<\"\\\"\"<<\", \";\n"
    + "            cout<<\"\\\"target\\\" : \";\n"
    + "            cout<<\"\\\"\"<<x<<\"\\\" }\";\n\n"
    + "            if(tot!=nodeCount-1){cout<<\",\";}\n"
    + "            cout<<\"\\n\";\n\n"
    + "            tot++;\n"
    + "        }\n"
    + "    }\n"
    + "    cout<<\"]\\n\";\n"
    + "    cout<<\"}\\n\";\n"
    + "}\n\n"
    + "string getVectorToString(vector<int> &v){\n"
    + "    string res = \"[\";\n"
    + "    for(int i=0; i<v.size(); i++){\n"
    + "        res += to_string(v[i]);\n"
    + "        if(i!=v.size()-1){res += \", \";}\n"
    + "    }\n"
    + "    res += \"]\";\n"
    + "    return res;\n"
    + "}\n\n"
    + "string get2DVectorToString(vector<vector<int>> &v){\n"
    + "    string res = \"[\";\n"
    + "    for(int i=0; i<v.size(); i++){\n"
    + "        res += getVectorToString(v[i]);\n"
    + "        if(i!=v.size()-1) res += br;\n"
    + "    }\n"
    + "    res += \"]\";\n"
    + "    return res;\n"
    + "};"
  },
  "java": {
    id: 62,
    defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
  },
  "python": {
    id: 71,
    defaultCode: `print("Hello World!")`,
  },
  "javascript": {
    id: 63,
    defaultCode: `console.log("Hello World!");`,
  }
};
