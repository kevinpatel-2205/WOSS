// class Queue {
//     constructor() {
//         this.items = [];
//     }

//     display() {
//         console.log("Queue:", this.items);
//     }

//     enqueue(element) {
//         this.items.push(element);
//         this.display();
//     }

//     dequeue() {
//         if (this.isEmpty()) {
//             console.log("Queue is empty");
//             return null;
//         }
//         const removed = this.items.shift();
//         this.display();
//         return removed;
//     }

//     front() {
//         return this.isEmpty() ? null : this.items[0];
//     }

//     rear() {
//         return this.isEmpty() ? null : this.items[this.items.length - 1];
//     }

//     isEmpty() {
//         return this.items.length === 0;
//     }

//     size() {
//         return this.items.length;
//     }
// }

// class Stack {
//     constructor() {
//         this.items = [];
//     }

//     display() {
//         console.log("Stack:", this.items);
//     }

//     push(element) {
//         this.items.push(element);
//         this.display();
//     }

//     pop() {
//         if (this.isEmpty()) {
//             console.log("Stack is empty");
//             return null;
//         }
//         const removed = this.items.pop();
//         this.display();
//         return removed;
//     }

//     peek() {
//         return this.isEmpty() ? null : this.items[this.items.length - 1];
//     }

//     isEmpty() {
//         return this.items.length === 0;
//     }

//     size() {
//         return this.items.length;
//     }
// }

// const queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.dequeue();

// console.log("Front:", queue.front());
// console.log("Rear:", queue.rear());
// console.log("Queue Size:", queue.size());

// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.pop();

// console.log("Top (Peek):", stack.peek());
// console.log("Stack Size:", stack.size());

// // javascript Hidden gems:

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.greet = function () {
//   console.log(`Hello, my name is ${this.name}`);
// };

// const alice = new Person("Alice");
// alice.greet();
// console.log(alice.__proto__ === Person.prototype);
// console.log(Person.prototype.constructor === Person);

function counter() {
  let count = 0;
  console.log("This is Run Once");
  console.log(`Initial count: ${count}`);
  return function () {
    count++;
    console.log(`Count: ${count}`);
  };
}
console.log(counter().toString());

const myCounter = counter();
myCounter();
myCounter();
myCounter();
