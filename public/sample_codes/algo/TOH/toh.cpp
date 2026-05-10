// Tower of Hanoi
void solveTower(int n, char from='A', char to='B', char aux='C'){
    if(n == 0){return;}

    solveTower(n - 1, from, aux, to);

    cout<<"Move disk "<<n<<" from rod "<<from<<" to rod "<<to<<"\n";

    solveTower(n - 1, aux, to, from);
}

int main(){
    // Tower of Hanoi
    int n; cin>>n;
    solveTower(n);
    return 0;
}