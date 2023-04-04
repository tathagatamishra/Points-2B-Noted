```

// Bad example: Modifying state directly
const [count, setCount] = useState(0);

function incrementCount() {
  count++; // Modifying state directly
  setCount(count);
}

// Good example: Updating state immutably
const [count, setCount] = useState(0);

function incrementCount() {
  setCount(count + 1); // Updating state immutably
}

```