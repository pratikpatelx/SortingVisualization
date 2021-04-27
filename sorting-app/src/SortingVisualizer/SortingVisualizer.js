import React from "react";
import "./SortingVisualizer.css";
import { Navbar, Nav } from "react-bootstrap";
// export default SortingVisualizer;
// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let index = 0; index < 100; index++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Sorting Visualization</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.resetArray()}>
                Generate New Array
              </Nav.Link>
              <Nav.Link>Merge Sort</Nav.Link>
              <Nav.Link>Quick Sort</Nav.Link>
              <Nav.Link>Heap Sort</Nav.Link>
              <Nav.Link>Bubble Sort</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
