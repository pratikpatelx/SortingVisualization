export function BubbleSort(array) {
  var isSorted = false;
  var lastSorted = array.length - 1;
  while (!isSorted) {
    isSorted = true;
    for (let index = 0; index < lastSorted; index++) {
      if (array[index] > array[index + 1]) {
        swapElements(array, index, index + 1);
        isSorted = false;
      }
    }
    lastSorted--;
  }
}

function swapElements(array, index, tempIndex) {
  var temp = array[index];
  array[index] = array[tempIndex];
  array[tempIndex] = temp;
}

export default BubbleSort;
