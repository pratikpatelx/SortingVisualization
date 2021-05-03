export function swapElements(array, index, tempIndex) {
  const temp = array[index];
  array[index] = array[tempIndex];
  array[tempIndex] = temp;
}

export function InsertionSort(array) {
  const copyArr = [...array];
  const animations = [];
  for (let index = 1; index < copyArr.length; index++) {
    for (let j = index - 1; j >= 0; j--) {
      animations.push([[j, j + 1], false]);
      if (copyArr[j + 1] < copyArr[j]) {
        animations.push([[j, copyArr[j + 1]], true]);
        animations.push([[j + 1, copyArr[j]], true]);
        swapElements(copyArr, j, j + 1);
      }
    }
  }
  return animations;
}
