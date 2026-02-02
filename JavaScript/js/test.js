// console.log([] + [] === ""); // true
// console.log([] + {} === "[object Object]"); // true
// console.log({} + [] === 0); // false
// console.log({} + {} === NaN); // false
// console.log([] + 1 === "1"); // true
// console.log({} + 1 === "[object Object]1"); // true
// console.log([] + null === "null"); // true
// console.log({} + null === "[object Object]null"); // true
// console.log([] + undefined === "undefined"); // true
// console.log({} + undefined === "[object Object]undefined"); // true
// console.log([1, 2] + [3, 4] === "1,23,4"); // true
// console.log({ a: 1 } + { b: 2 } === "[object Object][object Object]"); // true
// console.log([1, 2] + {} === "1,2[object Object]"); // true
// console.log({ a: 1 } + [] === "[object Object]"); // true
// console.log([] + function () {} === "function(){}"); // true
// console.log({} + function () {} === "[object Object]function(){}"); // true
// console.log([1, 2] + 3 === "1,23"); // true
// console.log({ a: 1 } + 3 === "[object Object]3"); // true
// console.log([1, 2] + null === "1,2null"); // true
// console.log({ a: 1 } + null === "[object Object]null"); // true
// console.log([1, 2] + undefined === "1,2undefined"); // true
// console.log({ a: 1 } + undefined === "[object Object]undefined"); // true
// console.log([] + true === "true"); // true
// console.log({} + true === "[object Object]true"); // true
// console.log(0.1 + 0.2 == 0.3); // false
// console.log(0.1+0.2==0.30000000000000004); // true

// function loop() {
//   Promise.resolve().then(loop);
// }
// loop();