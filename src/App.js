import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import {mergeSortAnimations} from './algorithms/mergeAlgo';
import './App.css';


let windowWidth = window.innerWidth - 200
let windowHeight = window.innerHeight - 300
let recommendedArrayLength = Math.floor(windowWidth / 8)


function App() {
  const [array, setArray] = useState([])
  const [numValue, setNumValue] = useState(recommendedArrayLength)
  const [speedValue, setSpeedValue] = useState(10)
  const [speed, setSpeed] = useState(10)
  
  const mergeSort = () => {
    const animations = mergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array__columns');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "#FF0007" : "#30D5C8";
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
  
  let dataArray = []

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
              max={50}
              onChange={(e) => setSpeedValue(e.target.value)}
            />
          </Form.Group>
          <Button size="sm" variant="outline-primary" onClick={handleSpeedSubmit}>Set Speed</Button>
        </div>
      </Form>
      
      <Button size="sm" variant="outline-danger"className="clear__button" onClick={handleClear}>Clear</Button>
      <Button size="sm" variant="outline-secondary" className="algo__options" onClick={() => mergeSort()}>MergeSort</Button>
      
      </div>
      </div>
      
      <div className="array__container" style={{width: `${windowWidth}px`}}>
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
