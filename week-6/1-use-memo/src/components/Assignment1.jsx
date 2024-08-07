import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    const [count, setCount] = useState(0);
    // Your solution starts here
    const factorialFunction = (num) => {
        let result = 1;
        while(num) {
            result *= num;
            num -= 1;
        }

        return result;
    }
    const expensiveValue = useMemo(() => {
        console.log("Calculating...")
        return factorialFunction(input);

    }, [input])
    console.log("render component")
    
    // Your solution ends here

    return (
        <div>
            <input                
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
        </div>
    );
}