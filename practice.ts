// Display output to the terminal
let message: string = "Hello from TypeScript!"; 
console.log(message);


// Recursive factorial calculation function 
function factorial(n: number): number {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
const result = factorial(4);
console.log("Factorial of 4:", result); 