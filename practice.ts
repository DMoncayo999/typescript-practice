// Display output to the terminal
function displayMessage(message: string): void {
 console.log(message); 
} 
displayMessage("Hello from TypeScript!"); 


// Recursive factorial calculation function 
function factorial(n: number): number {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
const result = factorial(8);
console.log("Factorial of 8:", result); 