def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m
    
    # Initialize temporary arrays
    L = [0] * n1
    R = [0] * n2
    
    # Copy data to temp arrays L[] and R[]
    for i in range(n1):
        L[i] = arr[l + i]
    for j in range(n2):
        R[j] = arr[m + 1 + j]
        
    i = 0
    j = 0
    k = l 
    
    # Merge the temp arrays back into arr[l..r]
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
        
    # Copy any remaining elements of L[]
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1
        
    # Copy any remaining elements of R[]
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def mergeSort(arr, begin, end, ok = 0):  
    nodeVal = f"MergeSort( {str(arr[begin:end+1])} )"    
    ok = tv.make(nodeVal, ok)
    
    if begin >= end:
        return

    mid = begin + (end - begin) // 2 # Use integer division
    mergeSort(arr, begin, mid, ok)
    mergeSort(arr, mid + 1, end, ok)
    merge(arr, begin, mid, end) 

    res = str(arr[begin:end+1])
    tv.onHover(res, ok)

#!---------------------- MAIN FUNCTION ----------------------------

def run_main():
    # Call your recursive function here
    unsorted_list = [12, 50, 81, 1, 14, 70, 2, 15, 26, 9, -23]
    mergeSort(unsorted_list, 0, len(unsorted_list)-1)
    
    # Don't remove the below lines
    tv.buildTree()
    tv.printData()