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


// Asynchronous function using async/await
function washDish(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dishWashed = true;
            if (dishWashed){
                resolve("You washed the dishes");
            }
            else{
                reject("You did not wash the dishes");
            }
        }, 1000);
    });
}

async function doTask() {
    try {
        const washDishResult = await washDish();
        console.log(washDishResult);
    } catch (error) {
        console.error(error);
    }
}

doTask();