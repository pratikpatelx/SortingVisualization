export function HeapSort(array) {
  const animations = [];
  if (array.length <= 1) {
    return array;
  }
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(array, animations) {
  let arrLen = array.length;
  for (let i = arrLen / 2 - 1; i >= 0; i--) {
    heapify(array, arrLen, i, animations);
  }

  for (let j = arrLen - 1; j > 0; j--) {
    animations.push([[0, array[j]], true]);
    animations.push([[j, array[0]], true]);
    [array[0], array[j]] = [array[j], array[0]];
    heapify(array, j, 0, animations);
  }
}

function heapify(array, size, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < size && array[i] < array[left]) {
    animations.push([i, left, true]);
    animations.push([i, left, true]);
    largest = left;
  }

  if (right < size && array[largest] < array[right]) {
    animations.push([i, right, true]);
    animations.push([i, right, false]);
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, array[largest], true]);
    animations.push([largest, array[i], true]);
    [array[i], array[largest]] = [array[largest], array[i]];

    heapify(array, size, largest, animations);
  }
}
