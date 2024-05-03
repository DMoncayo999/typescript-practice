// Display output to the terminal
function displayMessage(message: string): void {
    console.log(message);
}

// Usage
displayMessage("Hello, this is a note!");



//Recursion
function factorial(n: number): number {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Usage
const result = factorial(5);
console.log("Factorial of 5:", result); // Output: 120