import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import {mergeSortAnimations} from './algorithms/mergeAlgo';
import './App.css';


function App() {
  const [array, setArray] = useState([])
  const [numValue, setNumValue] = useState("")
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
  
  const handleNumChange = (e) => {
    setNumValue(e.target.value)
  }
  
  const handleSpeedChange = (e) => {
    setSpeed(e.target.value)
  }
  
  const handleSubmit = (e) => {
    changeData(numValue)
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
        <Form.Group>
          <Form.Control
            name="rowNum"
            value={numValue}
            style={{width: "5rem"}}
            placeholder={recommendedArrayLength}
            onChange={handleNumChange}
            label='Number input' 
            id='typeNumber' 
            type='number'
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
        <Form.Group>
          <Form.Control
            name="speed"
            value={speed}
            style={{width: "5rem"}}
            placeholder={speed}
            onChange={handleSpeedChange}
            label='Number input' 
            id='typeNumber' 
            type='number'
          />
        </Form.Group>
      </Form>
      <Button onClick={handleClear}>Clear</Button>
      <Button onClick={() => mergeSort()}>MergeSort</Button>
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
