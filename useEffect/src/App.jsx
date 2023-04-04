import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // The useEffect hook takes two arguments:
  // a function that performs the side effect
  // and an OPTIONAL array of dependencies that determines when the effect should be executed

  useEffect(() => {

    const p = document.querySelector("p");

    p.innerHTML = `${count}`;

  }, [count]);

  return (
    <div>
      <h1>useEffect Counter</h1>

      <button onClick={() => setCount(count + 1)}>Increment</button>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// useEffect hook is used to update the document title with the current count value whenever it changes. The effect is executed whenever the count variable changes, which is specified in the array of dependencies

export default App;
