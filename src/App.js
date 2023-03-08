import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import {mergeSortAnimations} from './algorithms/mergeAlgo';
import {bubbleSortAnimations} from './algorithms/bubbleSort'
import './App.css';

// NOTE https://www.geeksforgeeks.org/bubble-sort-visualization-using-javascript/


let windowWidth = window.innerWidth - 200
let windowHeight = window.innerHeight - 200
let recommendedArrayLength = Math.floor(windowWidth / 8)
let container = document.getElementById("container")


function App() {
  const [array, setArray] = useState([])
  const [numValue, setNumValue] = useState(recommendedArrayLength)
  const [speedValue, setSpeedValue] = useState("")
  const [speed, setSpeed] = useState(50)
  
  let dataArray = []
  
  // merge
  const mergeSort = () => {
    const animations = mergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array__columns');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        console.log("barOneIdx: " + barOneIdx, "barTwoIdx: " + barTwoIdx)
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }
  }
  
  // heap
  
  
  // quick
  
  
  // bubblesort Signal Interpreter
  const bubbleSort = async () => {
    // array is randomly generated
    const animations = bubbleSortAnimations(array);
    console.log("Animations Length: " + animations.length)
    console.log("ANIMATIONS: " + animations)
    const arrayBars = document.getElementsByClassName('array__columns');
    
    const bubbleSwap = (el1, el2) => {
      console.log("el1: " + el1, "el2: " + el2)
      return new Promise((resolve) => {
        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
        
        window.requestAnimationFrame(function() {
            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 300);
        });
    });
    }
    
    for (let i = 0; i < animations.length - 1; i++) {
      const barOneStyle = arrayBars[i].style
      const barTwoStyle = arrayBars[i + 1].style
      console.log("barOneStyle :" + barOneStyle, "barTwoStyle: " + barTwoStyle)
        // change the compared bars to lightgreen and then, after swapping them, 
        // revert the color of the first one back
        if(animations[i] === 1 && arrayBars[i] && arrayBars[i + 1]){
          console.log("move up: " + arrayBars[i], "move back: " + arrayBars[i + 1])
          // THERE'S SOMETHING BELOW THAT NEEDS TO BE FIXED AS WE KEEP GETTING ERRORS
          setTimeout(() => {
            barOneStyle.backgroundColor = "lightgreen"
          }, 20)
          
          setTimeout(() => {
            barTwoStyle.backgroundColor = "lightgreen"
          }, 20)
          
          await bubbleSwap(arrayBars[i], arrayBars[i + 1])
          
          setTimeout(() => {
            barOneStyle.backgroundColor = "blue"
          }, 20)
          // change the compared bars to lightgreen and then, after passing, 
          // revert the color of the first one back
        } else if (animations[i] === 0 && arrayBars[i] && arrayBars[i + 1]){
          console.log("pass")
          // THERE'S SOMETHING BELOW THAT NEEDS TO BE FIXED AS WE KEEP GETTING ERRORS
          setTimeout(() => {
             barOneStyle.backgroundColor = "lightgreen"
          }, 20)
          
          setTimeout(() => {
             barTwoStyle.backgroundColor = "lightgreen"
          }, 20)
          
          setTimeout(() => {
             barOneStyle.backgroundColor = "blue"
          }, 20)
        } 
    }
  }

  const changeData = (num) => {
    for(let i = 0; i < num; i++){
      dataArray.push(Math.floor(Math.random() * windowHeight + 10))
    }
    setArray(dataArray)
  }

  const handleArrSubmit = () => {
    changeData(numValue)
  }
  
  const handleSpeedSubmit = () => {
    setSpeed(speedValue)
  }
  
  const handleClear = (e) => {
    setArray([])
  }
  
  
  return (
    <div className="App">
      <div className="header">
      <h1 className="title">Algorithm Visualizer</h1>

      <div className="algo__controls">
      
      <div className="recommendations">
        <h6>Your viewport width is: {windowWidth}</h6>
        <h6>Recommended Array Length: {recommendedArrayLength}</h6>
        <h6>Animation Speed: {speed} milliseconds</h6>
      </div>
      
      <Form className="number__form" >
        <div className="number__form-container-rows">
          <Form.Label>Number of Rows</Form.Label>
          <Form.Group className="number__form-rows">
            <Form.Control
              name="rowNum"
              value={numValue}
              style={{width: "3rem", padding: "0.05rem", marginRight: "0.5rem"}}
              placeholder={recommendedArrayLength}
              onChange={(e) => setNumValue(e.target.value)}
              label='Number input' 
              id='typeNumber' 
              type='number'
            />
            <Form.Range 
              value={numValue} 
              min={2} 
              max={recommendedArrayLength}
              onChange={(e) => setNumValue(e.target.value)}
            />
          </Form.Group>
          <Button size="sm" variant="outline-primary" onClick={handleArrSubmit}>Set Rows</Button>
        </div>
        
        <div className="number__form-container-speed">
          <Form.Label>Execution Delay in ms</Form.Label>
          <Form.Group className="number__form-speed">
            <Form.Control
              name="speed"
              value={speedValue}
              style={{width: "3rem", padding: "0", marginRight: "0.5rem"}}
              placeholder={speed}
              onChange={(e) => setSpeedValue(e.target.value)}
              label='Number input' 
              id='typeNumber' 
              type='number'
            />
            <Form.Range 
              value={speedValue} 
              min={1} 
              max={100}
              onChange={(e) => setSpeedValue(e.target.value)}
            />
          </Form.Group>
          <Button size="sm" variant="outline-primary" onClick={handleSpeedSubmit}>Set Speed</Button>
        </div>
      </Form>
      
      <Button 
        size="sm" 
        variant="outline-danger"
        className="clear__button" 
        onClick={handleClear}
      >
        Clear
      </Button>
      <Button 
        size="sm" 
        variant="outline-secondary" 
        className="algo__options" 
        onClick={() => mergeSort()}
      >
        MergeSort
      </Button>
      <Button 
        size="sm" 
        variant="outline-secondary" 
        className="algo__options" 
        onClick={() => bubbleSort()}
      >
        BubbleSort
      </Button>
      
      </div>
      </div>
      
      <div id="container" className="array__container" style={{width: `${windowWidth}px`}}>
        {
          array?.map((el) => (
            <div 
              className="array__columns"
              key={Math.random() * 50000} 
              style={{height: `${el}px`}}>
           </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
