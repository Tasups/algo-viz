import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import './App.css';


function App() {
  const [array, setArray] = useState([])
  const [numValue, setNumValue] = useState("")
  
  let dataArray = []
  let windowWidth = window.innerWidth - 200
  let windowHeight = window.innerHeight - 220
  let recommendedArrayLength = Math.floor(windowWidth / 8)

  const changeData = (num) => {
    for(let i = 0; i < num; i++){
      dataArray.push(Math.floor(Math.random() * windowHeight + 10))
    }
    setArray(dataArray)
  }
  
  const handleChange = (e) => {
    setNumValue(e.target.value)
    console.log(e.target.value)
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

      <div className="number__form">
      <Form>
        <Form.Group>
          <Form.Control
            name="rowNum"
            value={numValue}
            style={{width: "5rem"}}
            placeholder={recommendedArrayLength}
            onChange={handleChange}
            label='Number input' 
            id='typeNumber' 
            type='number'
          />
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleClear}>Clear</Button>
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
