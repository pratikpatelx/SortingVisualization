export function BubbleSort(array) {
  const animations = [];
  bubblesortHelper(array, animations);
  return animations;
}

function bubblesortHelper(array, animations) {
  const lastSorted = array.length - 1;
  for (let i = 0; i < lastSorted; i++) {
    for (let j = 0; j < lastSorted - i; j++) {
      animations.push([[j, j + 1], false]);
      animations.push([[j, j + 1], false]);
      if (array[j] > array[j + 1]) {
        animations.push([[j, array[j + 1]], true]);
        animations.push([[j + 1, array[j]], true]);
        swapElements(array, j, j + 1);
      }
    }
  }
}

function swapElements(array, index, tempIndex) {
  var temp = array[index];
  array[index] = array[tempIndex];
  array[tempIndex] = temp;
}

export default BubbleSort;
