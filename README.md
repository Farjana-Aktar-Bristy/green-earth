#### 1) What is the difference between var, let, and const?

var
var is the oldest way to declare variables in JavaScript.var can be redeclared and updated within its scope It has function scope, meaning that a variable declared with var is accessible within the function it was declared in. If declared outside a function, it has global scope.

Example:
var name = "Bristy";
console.log(name); //Bristy
function newFunction() {
var address = "hello";
}

console.log(address ); // error: hello is undefined

let
let was introduced in ES6 and is block-scoped, which means it is only accessible within the block it was declared in.let cannot be redeclared within the same scope but can be updated.

Example:
let greeting = "say Hi";
if (true) {
let greeting = "say Hello instead";
console.log(greeting); // "say Hello instead"
}
console.log(greeting); // "say Hi"

const
const is also block-scoped and is used to declare variables that should not be reassigned. However, the properties of objects declared with const can still be modified.

Example:
const greeting = { message: "say Hi", times: 4 };
greeting.message = "say Hello instead";
console.log(greeting.message); // "say Hello instead"

#### 2) What is the difference between map(), forEach(), and filter()?

In JavaScript, map(), forEach(), and filter() are array methods used to process arrays, but each serves a different purpose and behaves differently.
map()
Creates a new array by applying a function to each element of the original array.
Returns a new array with transformed elements.

Example:
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n \* 2);
console.log(doubled); // Output: [2, 4, 6]

Here, map() applies a function that doubles each number, returning a new array.

forEach()
Executes a provided function once for each array element.
Returns undefined (does not return a new array).

Example:
const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n \* 2));
// Output:
// 2
// 4
// 6

It processes each element and performs an action but doesn’t create or return a new array.

3. filter()
   Creates a new array with all elements that pass (return true for) a test implemented by the provided function.
   Returns a new filtered array.

Example:
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

Here, filter() returns only even numbers into a new array.

#### 3) What are arrow functions in ES6?

Arrow functions were introduced in ES6 as a way to write functions in JavaScript. They provide a shorter syntax compared to traditional function expressions and come with some important behavioral differences.
Syntax:
// Traditional function expression
const add = function(a, b) {
return a + b;
};

// Arrow function equivalent
const add = (a, b) => a + b;

If the function body has only one expression, you can omit the curly braces {} and the return keyword — the expression is implicitly returned.
If the function body needs multiple statements, use curly braces, and explicitly use the return keyword if returning a value:
const multiply = (a, b) => {
const result = a \* b;
return result;
};

For functions without parameters, use empty parentheses:
const greet = () => console.log("Hello!");

For a single parameter, parentheses are optional:
const square = x => x \* x;

#### 4) How does destructuring assignment work in ES6?

Destructuring assignment is a syntax introduced in ES6 that allows to unpack values from arrays or properties from objects into distinct variables in a concise and readable way. It helps reduce redundancy and improves code clarity when extracting multiple values.

1. Array Destructuring
   You can extract values from an array and assign them to variables using a pattern that mirrors the array's structure.
   const numbers = [10, 20, 30];

// Basic destructuring
const [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

2. Object Destructuring
   Unlike arrays, objects assign variables based on matching property names.
   const person = {
   name: "Alice",
   age: 25,
   city: "Dhaka"
   };

const { name, age } = person;

console.log(name); // Alice
console.log(age); // 25

3. Nested Destructuring
   Destructuring supports unpacking from nested objects and arrays.
   const data = {
   id: 1,
   info: {
   email: "bristy@gmail.com",
   phones: ["1234", "5678"]
   }
   };

const { info: { email, phones: [phone1, phone2] } } = data;

console.log(email); // "bristy@gmail.com"
console.log(phone1); // "1234"

4. Use Cases
   Conveniently extracting data from function parameters:
   function greet({ name, age }) {
   console.log(`Hello ${name}, you are ${age} years old.`);
   }

greet(person);

#### 5) Explain template literals in ES6. How are they different from string concatenation?

It was introduced in ES6, which provides a more flexible and readable way to work with strings. Unlike traditional string concatenation, template literals simplify the process of embedding expressions, multi-line strings, and variable interpolation.Template literals are string literals that allow embedded expressions (variables) into your code. They are enclosed by backticks (`) instead of single (') or double (") quotes.

Syntax:
const name = "Bristy";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello,Bristy!

Template Literals are Different from String Concatenation?
Before ES6, string concatenation typically involved using the + operator to combine strings and variables:
const name = "Bristy";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello,Bristy!

Example Comparison
String Concatenation:
const firstName = "Farjana";
const lastName = "Aktar";
const age = 25;

const message = "My name is " + firstName + " " + lastName + " and I am " + age + " years old.";
console.log(message);

Template Literal:
const message = `My name is ${firstName} ${lastName} and I am ${age} years old.`;
console.log(message);

const name = "Bristy";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello,Bristy!
