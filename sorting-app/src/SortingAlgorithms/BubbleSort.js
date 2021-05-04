/*
Author: Pratik Patel
Purpose: BubbleSort.js contains the implementation of the BubbleSort algorithm 
*/
import { swapElements } from "./InsertionSort";

/* The purpose of this function is that it does the bubble sort implementation by calling an helper method
which does the actual bubble sorting implementation */
export function BubbleSort(array) {
  //the animations array
  const animations = [];
  //helper method that does the bubble sort
  bubblesortHelper(array, animations);
  return animations;
}
/* This function does the actual comparison based sorting using the bubble sort algorithm*/
function bubblesortHelper(array, animations) {
  //the last position of the array
  const lastSorted = array.length - 1;
  for (let i = 0; i < lastSorted; i++) {
    for (let j = 0; j < lastSorted - i; j++) {
      animations.push([[j, j + 1], false]);
      animations.push([[j, j + 1], false]);
      //check if value is greater than the other value in the array, if it is then swap
      if (array[j] > array[j + 1]) {
        animations.push([[j, array[j + 1]], true]);
        animations.push([[j + 1, array[j]], true]);
        //swap the values
        swapElements(array, j, j + 1);
      }
    }
  }
}

export default BubbleSort;
