function selectSort(arr) {
    let length = arr.length,
        minIndex = 0;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            swap(arr, i, minIndex);
        }
    }
    return arr;
}

function swap(arr, i, j) {
    let tem = arr[i];
    arr[i] = arr[j];
    arr[j] = tem;
}