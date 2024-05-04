// Display output to the terminal
var message = "Hello from TypeScript!";
console.log(message);
// Recursive factorial calculation function 
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
var result = factorial(4);
console.log("Factorial of 4:", result);
