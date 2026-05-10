void merge(vector<int> &arr, int l, int m, int r){
    int n1= m-l+1, n2= r-m;
 
    vector<int> L(n1), R(n2);
 
    for(int i=0; i<n1; i++){L[i] = arr[l+i];}
    for(int j=0; j<n2; j++){R[j] = arr[m+1+j];}
 
    int i = 0, j = 0, k = l; 
    while(i < n1 && j < n2){
        if(L[i] <= R[j]){
            arr[k++] = L[i++];
        }
        else{arr[k++] = R[j++];}
    }
 
    while(i < n1){arr[k++] = L[i++];}
    while(j < n2){arr[k++] = R[j++];}
}
 
void mergeSort(vector<int> &arr, int begin, int end, int ok=0){
    vector<int> tmp(arr.begin() + begin, arr.begin() + end + 1);
    string nodeVal = "Sort( " + getVectorToString(tmp) + " )";
    tv.make(nodeVal, ok);
    
    if(begin >= end){return;}

    int mid = begin + (end - begin) / 2;
    mergeSort(arr, begin, mid, ok);
    mergeSort(arr, mid + 1, end, ok);
    merge(arr, begin, mid, end);
    
    vector<int> tmp2(arr.begin() + begin, arr.begin() + end + 1);
    string res = getVectorToString(tmp2);
    tv.onHover(res, ok);
}


//!----------------------------------------------------------------------------------

int main()
{
    //Call you rescursive function here @ top
    vector<int> arr = {12, 50, 81, 1, 14, 70, 2, 15, 26, 9};
    mergeSort(arr, 0, arr.size()-1);

    //Don't remove the below lines
    tv.buildTree();
    tv.printData();
}