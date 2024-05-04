// Display output to the terminal
function displayMessage(message) {
    console.log(message);
}
displayMessage("Hello from TypeScript!");
// Recursive factorial calculation function 
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
var result = factorial(8);
console.log("Factorial of 8:", result);
