#include <bits/stdc++.h>
using namespace std;

class TreeVisualizer {
private:
    static const int N = 1e7+5; int nodeCount = 0; map<int, string> nodeToString;
    map<string, int> nodeToId; map<int, string> nodeToAns; map<int, pair<float, float>> pos;
    float *modifier = new float[N]; vector<int> *adj = new vector<int>[N];
public:
    void make(string nodeVal, int &node); void onHover(string nodeVal, int node); 
    void buildTree(); void printData();
};

//!----------------------------------------------------------------------------------

TreeVisualizer tv;

//Pre-defined Helper functions
string getVectorToString(vector<int> &v);
string get2DVectorToString(vector<vector<int>> &v);
#define br "\\n"

//!--------------------PASTE YOUR RECURSIVE FUNCTION HERE----------------------------

int fib(int x, int ok=0){  // THIS IS A EXAMPLE RECURSIVE FUNCTION [REPLACE IT WITH YOURS]
    string nodeVal = "fib(x = " + to_string(x) + ")";
    tv.make(nodeVal, ok);

    if(x<2){
        tv.onHover(to_string(x), ok);
        return x;
    }

    int tmp = fib(x - 1, ok) + fib(x - 2, ok);
    tv.onHover(to_string(tmp), ok);
    return tmp;
}

//!----------------------------------------------------------------------------------

int main()
{
    //Call you rescursive function here @ top
    int n = 5;
    fib(n);


    //Don't remove the below lines
    tv.buildTree();
    tv.printData();
}

//!------------------------------------------------------------------------------------------------------------------------------------------------

string getVectorToString(vector<int> &v){
    string res = "[";
    for(int i=0; i<v.size(); i++){
        res += to_string(v[i]);
        if(i!=v.size()-1){res += ", ";}
    }
    res += "]";
    return res;
}

string get2DVectorToString(vector<vector<int>> &v){
    string res = "[";
    for(int i=0; i<v.size(); i++){
        res += getVectorToString(v[i]);
        if(i!=v.size()-1) res += br;
    }
    res += "]";
    return res;
}

//!------------------------------------------------------------------------------------------------------------------------------------------------

void TreeVisualizer::buildTree() {
    // initializeX(nodeCount)
    for (int i = 1; i <= nodeCount; i++) {
        if (adj[i].empty()) continue;
        for (int j = 0; j < adj[i].size(); j++) {
            pos[adj[i][j]] = {j, 0};
        }
    }
    for (int i = 1; i <= nodeCount; i++) {
        if (adj[i].empty()) continue;
        float mid = pos[i].first - (pos[adj[i][0]].first + pos[adj[i].back()].first) / 2.00;
        modifier[i] = mid;
    }

    // updateXY(1, 0, 0)
    function<void(int,int,float)> updateXY = [&](int root, int depth, float modSum) {
        pos[root].first += modSum;
        pos[root].second = depth;
        for (int child : adj[root]) {
            updateXY(child, depth + 1, modSum + modifier[root]);
        }
    };
    updateXY(1, 0, 0);

    // makePositive()
    float minPos = 0;
    for (auto &it : pos) {
        minPos = min(minPos, it.second.first);
    }
    if (minPos < 0) {
        for (auto &it : pos) {
            it.second.first -= minPos;
        }
    }

    // Helper functions
    auto getRB = [&](int node) -> float {
        while (!adj[node].empty()) {
            node = adj[node].back();
        }
        return pos[node].first;
    };

    auto getLB = [&](int node) -> float {
        while (!adj[node].empty()) {
            node = adj[node][0];
        }
        return pos[node].first;
    };

    auto ShiftSubtree = [&](int node, float shift) {
        std::function<void(int, float)> shiftSubtree;
        shiftSubtree = [&](int node, float shift) {
            pos[node].first += shift;
            for (int child : adj[node]) {
                shiftSubtree(child, shift);
            }
        };
        shiftSubtree(node, shift);
    };

    // fixNodeConflicts(1)
    function<void(int)> fixNodeConflicts = [&](int root) {
        for (int child : adj[root]) {
            fixNodeConflicts(child);
        }
        if (adj[root].empty()) return;
        for (int j = 0; j < adj[root].size() - 1; j++) {
            int child1 = adj[root][j];
            int child2 = adj[root][j + 1];
            float RB_ofLeft = getRB(child1);
            float LB_ofRight = getLB(child2);
            if (RB_ofLeft >= LB_ofRight) {
                ShiftSubtree(child2, RB_ofLeft - LB_ofRight + 1);
            }
        }
        pos[root].first = (pos[adj[root][0]].first + pos[adj[root].back()].first) / 2.00;
    };
    fixNodeConflicts(1);
}

void TreeVisualizer::make(string nodeVal, int &node) {
    nodeCount++;
    nodeToString[nodeCount] = nodeVal;
    nodeToId[nodeVal] = nodeCount;
    adj[node].push_back(nodeCount);
    node = nodeCount;
}

void TreeVisualizer::onHover(string nodeVal, int node) {
    nodeToAns[node] = nodeVal;
}

void TreeVisualizer::printData(){
    cout<<"{\n";
    cout<<"\"nodes\": [\n";
    for(auto it = nodeToString.begin(); it!=nodeToString.end(); it++){
        cout<<"{ \"id\": \""<<it->first<<"\",";
        cout<<" \"position\": {\"x\": "<<pos[it->first].first<<", ";
        cout<<"\"y\": "<<pos[it->first].second<<"}, ";
        cout<<"\"data\": { \"label\": \""<<it->second<<"\", \"hidden\": \""<<nodeToAns[it->first]<<"\"} }";
        auto next_it = next(it);
        if(next_it != nodeToString.end()){cout << ",";}
        cout << "\n";
    }
    cout<<"],\n";
    cout<<"\"edges\": [\n";
    int tot = 1;
    for(int i=1; i<=nodeCount; i++){
        for(int x : adj[i]){
            cout<<"{ \"id\": \""<<tot<<"\", ";
            cout<<"\"source\": ";
            cout<<"\""<<i<<"\""<<", ";
            cout<<"\"target\" : ";
            cout<<"\""<<x<<"\" }";

            if(tot!=nodeCount-1){cout<<",";}
            cout<<"\n";

            tot++;
        }
    }
    cout<<"]\n";
    cout<<"}\n";
}