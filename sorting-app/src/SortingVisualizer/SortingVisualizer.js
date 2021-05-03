import React, { useState, useRef, useEffect } from "react";
import "./SortingVisualizer.css";
import { Navbar, Nav } from "react-bootstrap";
import { MergeSort } from "../SortingAlgorithms/MergeSort";
import { BubbleSort } from "../SortingAlgorithms/BubbleSort";
import { InsertionSort } from "../SortingAlgorithms/InsertionSort";

//Maximum Array Size
const MAX_ARR_LEN = 100;

//Maximum Delay of Animation (used in Timeouts)
const MAX_DELAY = 20;

// This is the main color of the array bars before sorted.
const PRIMARY_COLOR = "#6399F1";

// This is the colour of the Bars after they are sorted
const SORTED_COLOR = "#B578E8";

// This is the color of the comparison bar that will be compared based on the comparison
const COMPARISON_COLOR_1 = "#B22222";
// This is the color of the comparison bar that will be compared based on the comparison
const COMPARISON_COLOR_2 = "#FFA500";

function SortingVisualizer(props) {
  //Declare a new state variable called array that will store the elements to be sorted
  const [array, setArray] = useState([]);

  //A new state variable that tells us if we are sorting the array or not
  const [startSorting, setstartSorting] = useState(false);

  //A new state variable that checks if array is sorted or not
  const [isSorted, setisSorted] = useState(false);

  //Need this Ref to access the DOM nodes
  const nodeRef = useRef(null);

  //similar to componentDidMount we want to load a new array each time we load the page
  useEffect(() => {
    resetArray();
  }, []);

  //This function resets the contents of the array each time we reload the page a new array will be generated
  // with random values
  function resetArray() {
    //check if we are sorting the array
    if (startSorting) {
      return;
    }
    //check if array is already sorted then we just reset the color of the array contents i.e bars
    if (isSorted) {
      resetArrayColor();
    }

    //our array is not sorted
    setisSorted(false);

    // create a new temporary array
    const tempArray = [];
    //assign random values to the temporary array
    for (let index = 0; index < MAX_ARR_LEN; index++) {
      tempArray.push(randomIntFromInterval(5, 600));
    }
    // set the state of the array
    setArray(tempArray);
  }

  function resetArrayColor() {
    const arrBars = nodeRef.current.children;
    for (let i = 0; i < array.length; i++) {
      const arrBarStyle = arrBars[i].style;
      arrBarStyle.backgroundColor = PRIMARY_COLOR;
    }
  }

  function mergeSort() {
    const animationsArr = MergeSort(array);
    updateAnimation(animationsArr);
  }

  function bubbleSort() {
    const animationsArr = BubbleSort(array);
    updateAnimation(animationsArr);
  }

  function insertionSort() {
    const animationsArr = InsertionSort(array);
    updateAnimation(animationsArr);
  }

  function updateAnimation(animations) {
    if (startSorting) {
      return;
    }
    setstartSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            setArrayAccessAnimation(i);
            setArrayAccessAnimation(j);
          } else {
            const [i] = comparison;
            setArrayAccessAnimation(i);
          }
        } else {
          setArray((prevArray) => {
            const [k, newValue] = comparison;
            const newArray = [...prevArray];
            newArray[k] = newValue;
            return newArray;
          });
        }
      }, index * MAX_DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * MAX_DELAY);
  }

  function setArrayAccessAnimation(index) {
    const arrayBars = nodeRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = COMPARISON_COLOR_1;
    }, MAX_DELAY);

    setTimeout(() => {
      arrayBarStyle.backgroundColor = COMPARISON_COLOR_2;
    }, MAX_DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = nodeRef.current.children;
    for (let index = 0; index < arrayBars.length; index++) {
      const arrayBarStyle = arrayBars[index].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOR),
        index * MAX_DELAY
      );
    }
    setTimeout(() => {
      setisSorted(true);
      setstartSorting(false);
    }, arrayBars.length * MAX_DELAY);
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" className="topnav">
        <Navbar.Brand>Sorting Visualization</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={resetArray}>Generate New Array</Nav.Link>
            <Nav.Link onClick={bubbleSort}>Bubble Sort</Nav.Link>
            <Nav.Link onClick={insertionSort}>Insertion Sort</Nav.Link>
            <Nav.Link>Heap Sort</Nav.Link>
            <Nav.Link onClick={mergeSort}>Merge Sort</Nav.Link>
            <Nav.Link>Quick Sort</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="array-container" ref={nodeRef}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
            key={idx}
          ></div>
        ))}
      </div>
    </>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
