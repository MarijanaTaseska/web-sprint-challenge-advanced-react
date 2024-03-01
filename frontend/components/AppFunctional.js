
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message,setMessage] = useState(initialMessage)
  const [email,setEmail] = useState(initialEmail)
  const [steps,setSteps] = useState(initialSteps)
  const [index,setIndex] = useState(initialIndex)
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.


  function getXY(index) {
    const x = (index%3)+1
    const y = (Math.floor(index/3))+1
    return (`(${x}, ${y})`)
  // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }


  function getXYMessage() {
    const initial = getXY(index)
    return (`Coordinates ${initial}`)
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset(){
    // Use this helper to reset all states to their initial values.
    setSteps(initialSteps)
    setIndex(initialIndex)
    setMessage(initialMessage)
    setEmail('')
  }

  function getNextIndex(index,direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    switch (direction) {
      case 'left':
        return index % 3 !== 0 ? index - 1 : index;
      case 'right':
        return (index + 1) % 3 !== 0 ? index + 1 : index;
      case 'up':
        return index >= 3 ? index - 3 : index;
      case 'down':
        return index + 3 < 3 * 3 ? index + 3 : index;
      default:
        return index;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const nextIndex = getNextIndex(index, evt)
    if(nextIndex !== index && nextIndex >= 0 && nextIndex < 3*3){
      setIndex(nextIndex);
      setSteps(prevSteps => prevSteps+1)  
      setMessage('')
    }else if(nextIndex === index && evt === "left"){
     setMessage("You can't go left")
    }else if(nextIndex === index && evt === "right"){
      setMessage("You can't go right")
     }else if(nextIndex === index && evt === "up"){
      setMessage("You can't go up")
     }else if(nextIndex === index && evt === "down"){
      setMessage("You can't go down")
     }
    }
    
  

  function onChange(evt) {
    const {value} = evt.target
    setEmail(value)
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault()
    const x = (index%3)+1
    const y = (Math.floor(index/3))+1
    const payload = { 
      "x": x,
      "y": y,
      "steps": steps, 
      "email": email
    }
   
    axios.post('http://localhost:9000/api/result', payload)
    .then(res =>{
       setMessage(res.data.message)
        setEmail('')
      })
    .catch(err =>{
     setMessage(err.response.data.message)
    })

    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={()=>move('left')} id="left">LEFT</button>
        <button onClick={()=>move('up')} id="up">UP</button>
        <button onClick={()=>move('right')} id="right">RIGHT</button>
        <button onClick={()=>move('down')} id="down">DOWN</button>
        <button onClick={()=>reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
        id="email" 
        type="email" 
        placeholder="type email"
        value={email}
        onChange={onChange}
        >    
        </input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
