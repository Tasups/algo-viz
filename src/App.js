import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import {mergeSortAnimations} from './algorithms/mergeAlgo';
import './App.css';


function App() {
  const [array, setArray] = useState([])
  const [numValue, setNumValue] = useState(50)
  const [speedValue, setSpeedValue] = useState("")
  const [speed, setSpeed] = useState(0)
  
  const mergeSort = () => {
    const animations = mergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array__columns');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
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
  
  let dataArray = []
  let windowWidth = window.innerWidth - 200
  let windowHeight = window.innerHeight - 300
  let recommendedArrayLength = Math.floor(windowWidth / 8)

  const changeData = (num) => {
    for(let i = 0; i < num; i++){
      dataArray.push(Math.floor(Math.random() * windowHeight + 10))
    }
    setArray(dataArray)
  }
  
  const handleSpeedChange = (e) => {
    setSpeedValue(e.target.value)
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
      <h1>Algorithm Visualizer</h1>
      <h4>Your viewport width is: {windowWidth}</h4>
      <h4>Recommended Array Length: {recommendedArrayLength}</h4>
      <h5>Animation Speed: {speed} milliseconds</h5>

      <div className="number__form">
      
      <Form>
        <div>
          <Form.Label>Number of Rows</Form.Label>
          <Form.Group className="number__form-rows">
            <Form.Control
              name="rowNum"
              value={numValue}
              style={{width: "3rem", padding: "0", marginRight: "0.5rem"}}
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
              tooltipplacement="top"
              tooltip="on"
            />
          </Form.Group>
          <Button size="sm" onClick={handleArrSubmit}>Submit</Button>
        </div>
        
        <div>
          <Form.Group>
            <Form.Control
              name="speed"
              value={speedValue}
              style={{width: "5rem"}}
              placeholder={speed}
              onChange={handleSpeedChange}
              label='Number input' 
              id='typeNumber' 
              type='number'
            />
          </Form.Group>
          <Button onClick={handleSpeedSubmit}>Set Speed</Button>
        </div>
      </Form>
     
      </div>
       <Button onClick={handleClear}>Clear</Button>
      <Button onClick={() => mergeSort()}>MergeSort</Button>
      
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
