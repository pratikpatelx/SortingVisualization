import { swapElements } from "./InsertionSort";
export function QuickSort(array) {
  const copyArr = [...array];
  const maxLen = copyArr.length - 1;
  const animations = [];
  quickSortHelper(copyArr, 0, maxLen, animations);
  return animations;
}

function quickSortHelper(array, leftStart, rightEnd, animations) {
  if (leftStart <= rightEnd) {
    return;
  }
  const pivot = startPartition(array, leftStart, rightEnd, animations);
  quickSortHelper(array, leftStart, pivot, animations);
  quickSortHelper(array, pivot + 1, rightEnd, animations);
}

function startPartition(array, leftStart, rightEnd, animations) {
  let leftIndex = leftStart;
  let rightIndex = rightEnd + 1;
  const pivot = array[leftStart];
  while (true) {
    while (array[leftIndex++] <= pivot) {
      if (rightEnd === leftIndex) {
        break;
      }
      animations.push([leftIndex], false);
    }
    while (array[rightIndex--] >= pivot) {
      if (rightIndex === leftStart) {
        break;
      }
      animations.push([rightIndex], false);
    }
    if (rightIndex <= leftIndex) {
      break;
    }
    animations.push([[leftIndex, array[rightIndex]], true]);
    animations.push([[rightIndex, array[leftIndex]], true]);
    swapElements(array, leftIndex, rightIndex);
  }
  animations.push([[leftStart, array[rightIndex]], true]);
  animations.push([[rightIndex, array[leftStart]], true]);
  swapElements(array, leftStart, rightIndex);
  return rightIndex;
}
