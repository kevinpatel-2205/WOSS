// function showAlert() {
// alert("Show Alert");
// }

// const add = (a, b) => a + b;
// const greet = name => `Hello, ${name}!`;

// const user = "kevin";
// const greeting = `Welcome back, ${user}.
// Your current score is: ${score}.`;

// const person = { firstName: "kevin", age: 21, city: "Ahmedabad" };
// const { firstName, city } = person;

// const colors = ["red", "blue", "green"];
// const [primary, secondary] = colors;

// const calculateTotal = (discount = 0, ...prices) => {

//   const sum = prices.reduce((acc, p) => acc + p, 0);

//   return {
//     finalPrice: sum - discount,
//     allPrices: [...prices]
//   };
// };

// const moreColors = [...colors, "yellow", "purple"];
// const updatedPerson = { ...person, job: "Developer" };

// const sumAll = (...numbers) => numbers.reduce((acc, val) => acc + val, 0);

// const speed = 100;
// const car = {
//     speed,
//     drive() { console.log("Vroom!"); }
// };

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     speak() {
//         console.log(`${this.name} makes a noise.`);
//     }
// }

// class Dog extends Animal {
//     speak() {
//         console.log(`${this.name} barks!`);
//     }
// }

// const fetchData = () => {
//     return new Promise((resolve, reject) => {
//         const success = true;
//         setTimeout(() => {
//             success ? resolve("Data Received") : reject("Error!");
//         }, 1000);
//     });
// };
// fetchData().then(data => console.log(data));

// const nums = [1, 2, 3, 4, 5];
// const doubled = nums.map(n => n * 2);
// const evens = nums.filter(n => n % 2 === 0);

// console.log(greet(firstName));
// console.log(moreColors);
// const myDog = new Dog("Buddy");
// myDog.speak();

// // Task 2 If condition, switch, for loop, break, continue

// let age = 20;

// if (age >= 18) {
//   console.log("You are an adult.");
// } else {
//   console.log("You are a minor.");
// }

// let fruit = 'Apple';

// switch(fruit) {
//   case 'Apple':
//     console.log('Selected fruit is Apple');
//     break;
//   case 'Banana':
//     console.log('Selected fruit is Banana');
//     break;
//   default:
//     console.log('Unknown fruit');
// }

// for (let i = 0; i < 5; i++) {
//   console.log(`Iteration ${i}`);
// }

// for (let i = 0; i < 10; i++) {
//   if (i === 4) {
//     break;
//   }
//   console.log(i);
// }

// for (let i = 0; i < 5; i++) {
//   if (i === 2) {
//     continue;
//   }
//   console.log(i);
// }

// // Topic 3  JavaScript Statements

// // let score = 100;
// const pi = 3.14;
// function greet() {
//     return "Hello!";
// }

// core = score + 10;
// if (score > 50) {
//     console.log("You win!"); // Executed only if condition is true
// } else {
//     console.log("Try again.");
// }

// let total = (5 * 10) / 2;

// if (score > 50) {
//     console.log("You win!");
// } else {
//     console.log("Try again.");
// }

// for (let i = 0; i < 3; i++) {
//     console.log("Repeat this");
// }

// function checkZero(num) {
//     if (num === 0) return "Zero found";
//     console.log("Continuing...");
// }

// // Topic 4  JavaScript Comments

// /** * This is a JSDoc comment.
//  * It's like a formal book cover for a function.
//  */
// function double(num) {

//   /* This is a Multi-line comment.
//      Use this when you have a lot
//      to say about your logic. */
//   const result = num * 2;

//   // This is a Single-line comment. Short and sweet!
//   return result;
// }

// // console.log(double(5)); // This code is "commented out" so it won't run.

// console.log(double(10));

// // Topic 5  JavaScript Variables, JavaScript Let, JavaScript Const (Imp)

// var name = "John";
// var name = "Doe"; // No error! It just overwrites.
// console.log(name); // "Doe"

// let score = 10;
// score = 15; // You can change (reassign) the value.

// // let score = 20; // This would throw an ERROR (already declared).

// const birthYear = 1995;
// // birthYear = 2000; // This would throw an ERROR (assignment to constant).

// // Topic 5  JavaScript Assignment

// let scor = 100;

// scor += 10;
// scor *= 2;
// scor -= 50;

// console.log("Final Score:", scor);

// const colors = ["red", "green", "blue"];
// let [first, second] = colors;
// console.log(first, second);

// const user = { name: "Alice", age: 25 };
// const { name, age } = user;
// console.log(name, age);

// let a = 0;
// let b = 10;

// a ||= b;
// console.log(a);

// // Topic 6  JavaScript Data Types

// const user = { name: "John", age: 30 };
// const colors = ["red", "green", "blue"];

// // 1. String
// let person = "Alice";
// // 2. Number
// let age = 28;
// // 3. Boolean
// let isStudent = true;
// // 4. Undefined
// let graduationYear;
// // 5. Null (Intentional empty value)
// let car = null;
// // 6. Object
// let scores = { math: 90, science: 85 };
// // 7. Array (Type of Object)
// let fruits = ["Apple", "Mango"];

// console.log(typeof "Hello");  // "string"
// console.log(typeof 42);       // "number"
// console.log(typeof true);     // "boolean"
// console.log(typeof {});       // "object"
// console.log(typeof undefined);// "undefined"

// console.log(typeof null);     // "object" (This is a famous bug in JS)

// // Topic 8  JavaScript Functions

// function greet(name) {
//     return `Hello, ${name}!`;
// }
// console.log(greet("Kevin")); // Output: Hello, Kevin!

// const add = function(a, b) {
//     return a + b;
// };
// console.log(add(5, 10)); // Output: 15

// // Regular Function
// const multiply = function(x, y) {
//     return x * y;
// };

// const multiplyArrow = (x, y) => x * y;
// console.log(multiplyArrow(4, 5)); // Output: 20

// function sayHi() {
//     let message = "Hi!"; // Local variable
//     console.log(message);
// }
// sayHi();
// // console.log(message); // ERROR: message is not defined

// // Topic 9  JavaScript Objects (Imp)

// const user = {
//     firstName: "Kevin",
//     age: 30,
//     isLoggedIn: true,
//     greet: function() {
//         return `Hello, my name is ${this.firstName}`;
//     }
// };

// console.log(user.age);
// console.log(user["firstName"]);

// const car = { brand: "Tesla" };

// car.model = "Model 3";
// car.brand = "BMW";
// delete car.model;

// const laptop = { brand: "Apple", ram: "16GB", chip: "M2" };

// const { brand, chip } = laptop;
// console.log(brand, chip);

// const name = "Kevin";
// const age = 25;

// const person = { name, age };

// const settings = { theme: "dark", notifications: true };
// const userSettings = { ...settings, notifications: false };

// const circle = {
//     radius: 5,
//     getArea() {
//         return Math.PI * this.radius * this.radius;
//     }
// };
// console.log(circle.getArea());

// // Topic 10  JavaScript Events

// const btn = document.querySelector("#myButton");

// btn.addEventListener("click", () => {
//     alert("Button was clicked!");
// });

// const input = document.querySelector("input");

// input.addEventListener("keydown", (e) => {
//     console.log(`You pressed the key: ${e.key}`);
// });

// // Instead of adding listeners to 100 <li> items, add one to the <ul>
// const list = document.querySelector("#myList");

// list.addEventListener("click", (e) => {
//     if (e.target.tagName === "LI") {
//         console.log("List item clicked:", e.target.textContent);
//     }
// });

// Topic 11  JavaScript String and its methods, JavaScript Template Literals (Imp)

// let text = "Hello World";
// let length = text.length;

// let name = "Kevin";
// let message = "Hello " + name + ", how are you?";

// let name = "Kevin";
// let message = `Hello ${name}, how are you?`;

// let list = `
//   Items:
//   1. Apple
//   2. Banana
//   3. Orange
// `;

// console.log(list);

// Topic 12  JavaScript Numbers and its Methods

// Math.round(4.6);  // 5 (Rounds to nearest)
// Math.ceil(4.1);   // 5 (Rounds UP)
// Math.floor(4.9);  // 4 (Rounds DOWN)

// Math.sqrt(64);    // 8 (Square root)
// Math.pow(2, 3);   // 8 (2 to the power of 3)
// Math.abs(-5);     // 5 (Absolute value)

// Math.random();    // Returns a random number between 0 and 1

// let inputPrice = "19.99";
// let taxRate = 0.08;

// let price = Number(inputPrice);

// let total = price + (price * taxRate);

// console.log(`Total Price: $${total.toFixed(2)}`);
// if (!Number.isNaN(total)) {
//     console.log("Transaction successful.");
// }

// console.log(Number("10.5"));
// console.log(parseInt("10.5"));
// console.log(Number("10.5abc"));
// console.log(parseInt("10.5abc"));

// Topic 13  JavaScript Numbers and its Methods

// const fruits = ["Apple", "Banana", "Cherry"];
// const sparse = [1, , 3];

// const arr = [1, , 3];
// const doubled = arr.map(x => x * 2);
// console.log(doubled);

// const arr = [1, , 3];
// console.log(arr.includes(undefined));
// console.log(arr.indexOf(undefined));

// const arr = [1, , 3];
// console.log(arr.slice(0, 2));

// const inventory = ["Apple", , "Orange"];

// inventory.forEach((item, index) => {
//     console.log(`Index ${index}: ${item}`);
// });

// console.log(inventory.includes(undefined));

// console.log(inventory.map(item => item.toUpperCase()));

// console.log(inventory.join("-"));

// const data = [];
// data[0] = "A";
// data[2] = "C"; // index 1 is missing!

// console.log(`use of forEach`)
// data.forEach((item,index) => {
//   console.log(index, item);
// });
// console.log("\nuse of for of")
// let index=0;
// for (const item of data) {
//   console.log(index,item);
//   index++
// }

// const eventDate = new Date();
// console.log(eventDate);
// console.log(eventDate.toString());
// console.log(eventDate.toJSON());
// eventDate.setFullYear(2026);
// eventDate.setMonth(11);
// eventDate.setDate(25);

// const year = eventDate.getFullYear();
// const monthName = eventDate.toLocaleString('default', { month: 'long' });

// console.log(`The event is on ${monthName} ${eventDate.getDate()}, ${year}.`);

// if (eventDate.getTime() > Date.now()) {
//     console.log("This date is in the future!");
// }

// Topic 15  JavaScript Comparison

// let age = 20;
// let status = (age >= 18) ? "Adult" : "Minor";
// console.log(status);

// const x = 10;
// const y = "10";

// console.log(x == y);
// console.log(x === y);

// const score = 85;
// if (score >= 80 && score <= 90) {
//     console.log("You got a B!");
// }

// let input = null;
// console.log(input == undefined);
// console.log(input === undefined);

// Topic 16  JavaScript Classes

// class Player {
//     constructor(name, score) {
//         this.name = name;
//         this.score = score;
//     }

//     gainPoints(amount) {
//         this.score += amount;
//         console.log(`${this.name} now has ${this.score} points.`);
//     }
// }

// const user1 = new Player("Kevin", 100);
// user1.gainPoints(50);

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     eat() { console.log(`${this.name} is eating.`); }
// }

// class Dog extends Animal {
//     constructor(name, breed) {
//         super(name);
//         this.breed = breed;
//     }
//     bark() { console.log("Woof! Woof!"); }
// }

// const myDog = new Dog("Buddy", "Golden Retriever");
// myDog.eat();
// myDog.bark();

// class Square {
//     constructor(width) {
//         this.width = width;
//     }

//     get area() {
//         return this.width * this.width;
//     }

//     set side(value) {
//         if (value > 0) this.width = value;
//     }
// }

// const mySquare = new Square(10);
// console.log(mySquare.area);
// mySquare.side = 5;
// console.log(mySquare.area);

// class MathHelper {
//     static triple(n) {
//         return n * 3;
//     }
//     square(n) {
//         return n * n;
//     }
// }
// console.log(MathHelper.triple(10));
// console.log(new MathHelper().square(5));

// Topic 17  JavaScript all Arrow Functions

// const user = {
//     name: "Alice",
//     shout: function() { console.log(this.name); },
//     whisper: () => { console.log(this.name); }
// };

// console.log("Using regular function:");
// user.shout();
// console.log("Using arrow function:");
// user.whisper();

// const double = (n) => n * 2;
// console.log(double(5)); // 10

// const logger = msg => console.log(msg);
// logger("Test log");

// const getUser = id => ({ id: id, status: "Active" });
// console.log(getUser(101));

// function Timer() {
//     this.seconds = 0;

//     setInterval(() => {
//         this.seconds++;
//         console.log(this.seconds);
//     }, 1000);
// }

// new Timer();

// const fetchData = async (url) => {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// };

// Topic 18  JSON

// const user = { name: "Alice", age: 25 };
// const jsonString = JSON.stringify(user);

// console.log(jsonString);

// const response = '{"status": "success", "code": 200}';
// const data = JSON.parse(response);

// console.log(data.status);

// fetch('https://api.example.com/user/1')
//   .then(response => response.json()) // Automatically runs JSON.parse()
//   .then(data => {
//     console.log(`Hello, ${data.username}!`);
//   })
//   .catch(error => console.error("Failed to load JSON"));

// Topic 19  JS Async - async/await, promises, callbacks (Most IMP)

// function fetchData(callback) {
//     setTimeout(() => {
//         console.log("Data downloaded");
//         callback();
//     }, 2000);
// }

// fetchData(() => {
//     console.log("Processing finished.");
// });

// const myPromise = new Promise((resolve, reject) => {
//     let success = true;
//     if (success) {
//         resolve("Success!");
//     } else {
//         reject("Error!");
//     }
// });

// myPromise
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

// async function getUserData() {
//     try {
//         console.log("Fetching...");
//         const response = await fetch('API URL');
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error("Failed:", error);
//     }
// }
// getUserData();

// setTimeout(() => {
//   console.log("First");
//   setTimeout(() => {
//     console.log("Second");
//     setTimeout(() => {
//       console.log("Third");
//     }, 1000);
//   }, 1000);
// }, 1000);

// function wait(message) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(message);
//       resolve();
//     }, 1000);
//   });
// }
// async function run() {
//   await wait("First");
//   await wait("Second");
//   await wait("Third");
// }
// run();

// const p1 = Promise.resolve("User Data");
// const p2 = Promise.resolve("Settings");
// const p3 = Promise.resolve("Notifications");

// Promise.all([p1, p2, p3])
//     .then(values => console.log(values)) // ["User Data", "Settings", "Notifications"]
//     .catch(err => console.log("One failed, so I stopped."));

// const p1 = Promise.resolve("Success!");
// const p2 = Promise.reject("Failed!");

// Promise.allSettled([p1, p2])
//     .then(results => console.log(results));

// const fetchData = fetch('https://jsonplaceholder.typicode.com/todos/1');
// const timeout = new Promise((_, reject) => setTimeout(() => reject("Timeout!"), 3000));

// Promise.race([fetchData, timeout])
//     .then(res => console.log("Data received!" ,res.status))
//     .catch(err => console.log(err));

// const srv1 = Promise.reject("Server 1 Down");
// const srv2 = Promise.reject("Server 2 Data");
// const srv3 = Promise.resolve("Server 3 Data");

// Promise.any([srv1, srv2, srv3])
//     .then(value => console.log(value))
//     .catch(err => console.log("All servers are down."));

// const cachedData = Promise.resolve({ id: 1, name: "Kevin" });
// const errorMsg = Promise.reject("Invalid API Key");

// cachedData.then((data) => console.log(data)).catch((err) => console.error(err));
// errorMsg.then((data) => console.log(data)).catch((err) => console.error(err));

// Topic 20  JS Objects

// const user = {
//     name: "Kevin",
//     age: 30,
//     greet: function() {
//         console.log(`Hi, I'm ${this.name}`);
//     }
// };

// const car = { brand: "Tesla" };

// car.brand = "Ford";
// car.year = 2024;
// let Company = car["brand"];
// delete car.brand;

// const user = {
//   name: "Alex",
//   age: 20
// };

// console.log(Object.keys(user));
// console.log(Object.values(user));
// console.log(Object.entries(user));
// const newUser = Object.assign({}, user, { age: 21 });
// console.log(newUser);
// Object.freeze(user);
// user.age = 25;
// console.log(user);

// let a = { name: "Alice" };
// let b = a;

// b.name = "Bob";
// console.log(a.name);

// Topic 21 Function properties Text processing

// function add(a, b, c) {}
// console.log(add.length); // Output: 3

// const myFunc = function test() {};
// console.log(myFunc.name); // Output: "test"

// const str = "Modern JavaScript is great";

// console.log(str.startsWith("Modern"));
// console.log(str.endsWith("great"));
// console.log(str.includes("Script"));
// console.log("Ha ".repeat(3));

// const pattern = /hello/i; // 'i' means case-insensitive
// const text = "Hello World";

// console.log(pattern.test(text)); // true

// const numbers = "Items: 10, 20, 30".match(/\d+/g); // ["10", "20", "30"]
// console.log(numbers);

// function formatInput(input) {
//     const clean = input.trim().toLowerCase().replace("admin", "user");
//     return `ID-${clean}-${Math.random().toString(36).slice(2, 7)}`;
// }

// console.log(`Function "${formatInput.name}" expects ${formatInput.length} argument.`);

// const result = formatInput("   ADMIN_Account   ");
// console.log(result);

// const obj = {};

// const obj = new Object();

// const obj = Object.create(null);

// class Empty {}
// const obj = new Empty();

// Topic 22  map

// const numbers = [1, 2, 3, 4];
// const doubled = numbers.map(num => num * 2);
// console.log(doubled); // [2, 4, 6, 8]

// Create a new Map to store user data
// let users = new Map();

// users.set(101, { name: "Alice", age: 25 });
// users.set(102, { name: "Bob", age: 30 });

// console.log(users.get(102));
// console.log(users.has(101)); // true
// users.delete(103);
// console.log(users.size); // 2

// users.forEach((user, id) => {
//     console.log(`User ${id} is ${user.name}, ${user.age} years old`);
// });

// users.clear();
// console.log(users.size);

// const sparse = [1, , 3];
// const result = sparse.map(x => x * 10);
// console.log(result); // [10, <1 empty item>, 30]

// Topic 23  set

// const numbers = [1, 2, 2, 3, 4, 4, 4, 5];
// const uniqueSet = new Set(numbers);
// console.log(uniqueSet); // Set {1, 2, 3, 4, 5}

// uniqueSet.add(6);
// uniqueSet.delete(2);
// console.log(uniqueSet.has(3)); // true
// console.log(uniqueSet.size);  // 5

// const tags = new Set(["JavaScript", "Web", "Dev"]);

// tags.forEach(tag => {
//     console.log("Tag:", tag);
// });

// let user = { name: "Alice" };
// const visitedPages = new WeakSet();
// visitedPages.add(user);

// Topic 24  Prototype

// function Person(name) {
//   this.name = name;
// }
// Person.prototype.sayHi = function() {
//   console.log("Hi, I am " + this.name);
// };
// const user1 = new Person("Kevin");
// user1.sayHi();

// function Soldier(name) {
//   this.name = name;
//   this.health = 100;
// }

// Soldier.prototype.attack = function() {
//   console.log(this.name + " is attacking!");
// };

// const s1 = new Soldier("Soldier A");
// const s2 = new Soldier("Soldier B");

// s1.attack();
// s2.attack();

// console.log(s1.attack === s2.attack); // true

// Topic 25  Lexical Scope

// function createSecurityGate() {
//     const secretCode = "1234";
//     return function enterGate(userCode) {
//         if (userCode === secretCode) {
//             console.log("Access Granted");
//         } else {
//             console.log("Access Denied");
//         }
//     };
// }
// const myGate = createSecurityGate();
// try {
//   myGate("1234");
//   console.log(secretCode);
// } catch (error) {
//   console.log("Error:", error.message);
// }

// Topic 26  Call, Apply and Bind

// const person = {
//   firstName:"John",
//   lastName: "Doe",
//   display: function () {
//    console.log(this.firstName + " " + this.lastName);
//   }
// }
// setTimeout(person.display, 3000);
// let display = person.display.bind(person);
// setTimeout(display, 3000);

// function greet(city, country) {
//     console.log(`Hello, I'm ${this.name} from ${city}, ${country}.`);
// }

// const user1 = { name: "Kevin" };
// const user2 = { name: "Patel" };

// greet.call(user1, "Paris", "France");
// greet.apply(user2, ["Tokyo", "Japan"]);
// const bobGreet = greet.bind(user2, "London", "UK");
// bobGreet();

// Topic 27  different between slice and splice

// const fruits = ["Apple", "Banana", "Cherry", "Date"];

// const someFruits = fruits.slice(1, 3);
// console.log( `Slice: ${someFruits}`);
// console.log(`Original Array after Slice: ${fruits}`);

// const removedFruits = fruits.splice(1, 2);
// console.log(`Splice: ${removedFruits}`);
// console.log(`Original Array after Splice: ${fruits}`);

// Topic 28  higher order function

// const cart = [
//     { item: "Laptop", price: 1000 },
//     { item: "Mouse", price: 20 },
//     { item: "Monitor", price: 200 }
// ];
// const expensiveItems = cart.filter(product => product.price > 50);
// const discountedItems = expensiveItems.map(product => {
//     return {
//         ...product,
//         price: product.price * 0.9
//     };
// });
// console.log(discountedItems);

// Topic 29  First Order Functions

// function calculateTax(price, taxRate) {
//     const taxAmount = price * taxRate;
//     return price + taxAmount;
// }
// const productPrice = 100;
// const currentTax = 0.15;
// const finalTotal = calculateTax(productPrice, currentTax);
// console.log(`Total to pay: $${finalTotal.toFixed(2)}`);

// Topic 30  unary function

// const users = [
//     { id: 101, name: "Alice" },
//     { id: 102, name: "Bob" },
//     { id: 103, name: "Charlie" }
// ];
// const getId = (user) => user.id;
// console.log(users.map(getId));

// Topic 31  currying function

// function curriedSum(a) {
//     return function(b) {
//         return a + b;
//     };
// }
// // Or using Arrow Functions (much cleaner):
// const curriedSum = a => b => a + b;

// const orderCoffee = drink => size => extras => {
//   return `You ordered a ${size} ${drink} with ${extras}`;
// };

// const chooseDrink = orderCoffee("Latte");
// const chooseSize = chooseDrink("Medium");
// console.log(chooseSize("Oat Milk"));

// console.log(orderCoffee("Espresso")("Large")("Extra Shot"));

// Topic 32 pure function

// PURE: Only uses 'a' and 'b' to produce a result
// function add(a, b) {
//     return a + b;
// }

// // IMPURE: Uses an external variable that could change
// let tax = 0.5;
// function calculateTotal(price) {
//     return price + tax;
// }

// Topic 33 Temporal Dead Zone

// // console.log(myVar); //  ReferenceError
// let someOtherCode = "Hello";
// let myVar = 10;
// console.log(myVar); // Output: 10

// Topic 34 memoization

// const getStats = (userId) => {
//     return `Stats for user ${userId}`;
// };
// function fastStats() {
//     const cache = new Map();
//     return (id) => {
//         if (cache.has(id)) {
//             console.log("Fetching from Cache...");
//             return cache.get(id);
//         }
//         const result = getStats(id);
//         cache.set(id, result);
//         return result;
//     };
// }
// const stats = fastStats();

// console.log(stats(1));
// console.log(stats(2));
// console.log(stats(1));

// Topic 35 closures

// function createCounter() {
//     let count = 0;
//     return function() {
//         count++;
//         return count;
//     };
// }
// const myCounter = createCounter();

// console.log(myCounter()); // 1
// console.log(myCounter()); // 2
// console.log(myCounter()); // 3

// Topic 36 service worker

// console.log(true == "true");
