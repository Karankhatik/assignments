/* eslint-disable react/display-name */
import { useState, useCallback, memo } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  // Your code starts here
  const handleIncrement = useCallback(() => {
    console.log("handleIncrement created");
    setCount(count + 1);
  }, [count]);

  const handleDecrement = useCallback(() => {
    console.log("handledecrement created");
    setCount(count - 1);
  }, [count]);

  // Your code ends here

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsCounting(!isCounting)}>counting</button>
        {isCounting ? "Stop Counting" : "Start Counting"}
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const CounterButtons = memo(({ onIncrement, onDecrement }) => {
    console.log("CounterButtons created");
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});
