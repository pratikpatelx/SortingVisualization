/*
Author: Pratik Patel
Purpose: MergeSort.js contains the implementation of the MergeSort algorithm 
*/
export function MergeSort(arr) {
  //copy the contents of the array into a new array
  const copy = [...arr];
  //the length of the array that we copied
  const len = copy.length;
  //a new array object of the correct length
  const aux = Array(len);
  //a new animations array
  const animations = [];
  //helper method to do the splitting into halves
  mergeSortHelper(copy, aux, 0, len - 1, animations);
  return animations;
}

function mergeSortHelper(arr, aux, left, right, animations) {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortHelper(arr, aux, left, mid, animations);
  mergeSortHelper(arr, aux, mid + 1, right, animations);
  merge(arr, aux, left, mid, right, animations);
}

function merge(arr, aux, left, mid, right, animations) {
  for (let index = left; index <= right; index++) {
    aux[index] = arr[index];
  }
  let i = left;
  let j = mid + 1;
  //console.log(aux);
  //console.log(arr);
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      animations.push([[j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else if (j > right) {
      animations.push([[i], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push([[i, j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else {
      animations.push([[i, j], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    }
  }
}
