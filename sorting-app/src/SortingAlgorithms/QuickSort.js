/*
Author: Pratik Patel
Purpose: QuickSort.js contains the implementation of the QuickSort algorithm 
*/
//Importing the swap function defined in Insertion Sort
import { swapElements } from "./InsertionSort";

/* This function is used to get the animation's array for our quick sort implementation,
it calls a helper method which does the actual quick sort implementation
Parameters: array - The array which is passed to be sorted
Returns: an animations 2D array which contains the values of each elements in the array in sorted order
 */
export function QuickSort(array) {
  //copy the contents of the array into a new temporary array
  const copyArr = [...array];
  //the length of the array we just copied
  const maxLen = copyArr.length - 1;
  //the animations array that will store the compared values
  const animations = [];
  //the method that does the actual quick sort implementation
  quickSortHelper(copyArr, 0, maxLen, animations);
  return animations;
}

/*This method does the quick sort implementation recursively, it calculates the pivot position and calls another function
that does the partition of the array from the pivot
Parameters: array - the array to be sorted
            leftStart - the starting position of the array
            rightEnd - the last position of the array
            animations - the animations array
*/
function quickSortHelper(array, leftStart, rightEnd, animations) {
  //check if left index is equal to the right index then we have nothing to compare!
  if (leftStart <= rightEnd) {
    return;
  }
  //get the pivot the point at which we will compare the values
  const pivot = startPartition(array, leftStart, rightEnd, animations);
  //sort the first half of the array to the pivot
  quickSortHelper(array, leftStart, pivot, animations);
  //sort the second half of the array from the pivot to the end of the array
  quickSortHelper(array, pivot + 1, rightEnd, animations);
}

/* This functions does the partition of the array from the pivot and adds the sorted values to the animations array
Parameters: array - the array to be partitioned and sorted
            leftStart - the starting index of the array
            rightEnd - the last index of the array
            animations - the animations array
*/
function startPartition(array, leftStart, rightEnd, animations) {
  //get the starting index
  let leftIndex = leftStart;
  // get the end of the array index
  let rightIndex = rightEnd + 1;
  // shows where the pivot is
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
