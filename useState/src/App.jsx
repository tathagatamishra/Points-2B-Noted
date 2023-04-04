import { useState } from "react";
import './App.css'

// using useState hook 

function Counter() {

  // count is a state variable that will hold the counter value
  // Initialize the state with a starting value of 0
  
  const [count, setCount] = useState(0)  
  


  return (
    <div>

      <h1>C O U N T E R</h1>


      <h1>{count}</h1>

      {/* updating state variable onClick */}

      <button onClick={() => setCount(count - 1)}>decrease</button>

      <button onClick={() => setCount(count + 1)}>increase</button>
    
    </div>
  )

  // by calling setCount updating the state of the count variable.
  // setCount take the value of updated state variable  (count + 1)

}

export default Counter;