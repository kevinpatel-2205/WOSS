// Array.prototype.includes()

if (!Array.prototype.includes) {
  Array.prototype.includes = function (value, start = 0) {
    for (let i = start; i < this.length; i++) {
      if (this[i] === value) {
        return true;
      }
    }
    return false;
  };
}

// const numbers = [1, 2, 3, 4];

// console.log(numbers.includes(3)); // true
// console.log(numbers.includes(10)); // false


// Array.prototype.map()

if (!Array.prototype.map) {
  Array.prototype.map = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }

    return result;
  };
}

// const nums = [1, 2, 3];

// const doubled = nums.map((n) => n * 2);

// console.log(doubled); // [2, 4, 6]

