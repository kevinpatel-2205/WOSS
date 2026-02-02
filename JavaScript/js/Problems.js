// // Set 1 :
// // Find the maximum and minimum numbers from a given array without using the array function
// // Input: [100, 4, 9, 25, 36]
// // Output:  Max => 100, Min => 4

// function findMaxMin(arr) {
//     let max = arr[0];
//     let min = arr[0];
//     for(let i=1;i<arr.length;i++){
//         if(arr[i]>max)max=arr[i];
//         if(arr[i]<min)min=arr[i];
//     }
//     console.log(`Max =>  ${max}`);
//     console.log(`Min => ${min}`);
// }
// findMaxMin([100, 4, 9, 25, 36]);

// // Print Series 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 up to value is less than 50
// for(let i=1;i<=50;i=i+2){
//     console.log(i);
// }

// // Find the match square root value.
// // array1 = [1, 2, 3, 4, 5];
// // array2 = [1, 4, 9, 25, 36];
// // output: [1, 2, 3, 5]

// let matchSquare = (arr1,arr2)=>{
//     return arr1.filter(no=>arr2.includes(Math.pow(no,2)));
// }
// console.log(matchSquare([1,2,3,4,5],[1, 4, 9, 25, 36]));

// without any inbuilt functions
// array1 = [1, 2, 3, 4, 5];
// array2 = [1, 4, 9, 25, 36];
// let result = [];
// for (let i = 0; i < array1.length; i++) {
//     let square = array1[i] * array1[i];
//     for (let j = 0; j < array2.length; j++) {
//         if (square === array2[j]) {
//             result.push(array1[i]);
//             break;
//         }
//     }
// }
// console.log(result);

// // Make all vowels uppercase and consonants lowercase for a given string
// // Ex: Websoptimization
// // Output: vowels => EOIIAIO, consonant => wbsptmztn

// function findVC(str) {
//     let vowels = ["a", "e", "i", "o", "u"];
//     let chars = str.toLowerCase().split("");
//     let vov = chars.filter(ch => vowels.includes(ch)).join("").toUpperCase();
//     let con = chars.filter(ch => !vowels.includes(ch)).join("").toLowerCase();

//     console.log(`vowels => ${vov}`);
//     console.log(`consonants => ${con}`);
// }
// findVC("Websoptimization");

// // without any inbuilt functions
// function findVC(str) {
//     let vowels = ['a', 'e', 'i', 'o', 'u'];
//     let vov = '';
//     let con = '';
//     for (let i = 0; i < str.length; i++) {
//         let ch = str[i];
//         let lowerCh = ch.toLowerCase();
//         if (vowels.includes(lowerCh)) {
//             vov += lowerCh.toUpperCase();
//         } else {
//             con += lowerCh;
//         }
//     }
//     console.log(`vowels => ${vov}`);
//     console.log(`consonants => ${con}`);
// }
// findVC("Websoptimization");

// // Pattern logic
// //       *
// //     * * *
// //   * * * * *

// let rows = 3;
// for (let i = 1; i <= rows; i++) {
//     let line = "";
//     for (let s = 1; s <= rows - i; s++) {
//         line += "  ";
//     }
//     for (let j = 1; j <= (2 * i - 1); j++) {
//         line += "* ";
//     }
//     console.log(line);
// }

// // Print Series 3, 6, 12, 24, 48, 96 up to a value is less than 500
// let no=3;
// while(no<500){
//     console.log(no);
//     no*=2;
// }

// // Print the last 10 even numbers that are divisible by 3 between 10 to 100

// var count = 0;
// for (let i = 96; i >= 10; i -= 6) {
//     console.log(i);
//     count++;
//     if (count === 10) break;
// }
// logic 2:
//  let count = 0;
//     for (let i = 100; i >= 10; i--) {
//         if (i % 2 === 0 && i % 3 === 0) {
//             console.log(i);
//             count++;
//         }
//         if (count === 10) break;
//     }

// // Print 10 even numbers that are divisible by 3 between 10 to 50

// var count = 0;
// for (let i = 48; i >= 10; i -= 6) {
//     console.log(i);
//     count++;
//     if (count === 10) break;
// }

// logic2
// let count = 0;
// for (let i = 10; i <= 50; i++) {
//     if (i % 2 === 0 && i % 3 === 0) {
//         console.log(i);
//         count++;
//     }
//     if (count === 10) break;
// }

// // Find duplicate numbers from the given array.
// // Ex : [12, 45, 12, 23, 64, 23]

// let arr=[12, 45, 12, 23, 64, 23, 12];
// const duplicates = arr.filter(
//   (item, index) => arr.indexOf(item) != index
// );
// console.log([...new Set(duplicates)])

// without any inbuilt functions
// let arr = [12, 45, 12, 23, 64, 23, 12];
// let duplicates = [];
// for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//         if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
//             duplicates.push(arr[i]);
//         }
//     }
// }
// console.log(duplicates);

// Find the second largest element from an array.
// Ex : [12, 45, 100, 23, 64, 76]

// let arr = [12, 45, 100, 23, 64, 76];
// console.log(arr.sort((a, b) => a - b)[arr.length - 2]);

// without any inbuilt functions
// let arr = [12, 45, 100, 23, 64, 76];
// let max = -Infinity;
// let secondMax = -Infinity;
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > max) {
//         secondMax = max;
//         max = arr[i];
//     } else if (arr[i] > secondMax && arr[i] != max) {
//         secondMax = arr[i];
//     }
// }
// console.log(secondMax);

// // Fibonacci Series (The Fibonacci sequence is a series where the next term is the sum of the previous two terms)

// let fib = [0, 1];
// for (let i = 2; i < 10; i++) {
//   fib[i] = fib[i - 1] + fib[i - 2];
// }
// console.log(fib);

// // Find unique numbers from the given array without using the array function.
// // Ex : [100, 32, 15, 76, 12, 34, 32]
// // Output : [100, 32, 15, 76, 12, 34]

// let arr=[100, 32, 15, 76, 12, 34, 32];
// console.log(...new Set(arr));

// without any inbuilt functions
// let arr = [100, 32, 15, 76, 12, 34, 32];
// let unique = [];
// for (let i = 0; i < arr.length; i++) {
//     if (!unique.includes(arr[i])) {
//         unique.push(arr[i]);
//     }
// }
// console.log(unique);

// // Calculate String character count.
// // Ex : "mississippi";
// // Output: m = 1, i = 4, s = 4, p = 2

// let str="mississippi";
// let map=new Map();
// for(let i=0;i<str.length;i++){
//     // !map.has(str[i]) ?  map.set(str[i],1) : map.set(str[i],map.get(str[i])+1)
//     map.set(str[i], (map.get(str[i]) || 0) + 1);
// }
// console.log(map);

// without any inbuilt functions
// let str = "mississippi";
// let charCount = {};
// for (let i = 0; i < str.length; i++) {
//     let ch = str[i];
//     if (charCount[ch]) {
//         charCount[ch]++;
//     } else {
//         charCount[ch] = 1;
//     }
// }
// console.log(charCount);

// // Program to check for Anagram (Anagram:- a word or phrase that is made by arranging the letters of another word or phrase in a different order)
// // Ex :1. Listen, 2. Silent

// let str1="Listen";
// let str2="Silent";
//  console.log(str1.toLowerCase().split("").sort().join("") === str2.toLowerCase().split("").sort().join(""));

// without any inbuilt functions
// let str1 = "Listen";
// let str2 = "Silent";
// if (str1.length !== str2.length) {
//     console.log("Not Anagram");
// } else {
//     let charCount1 = {};
//     let charCount2 = {};
//     for (let i = 0; i < str1.length; i++) {
//         let ch1 = str1[i].toLowerCase();
//         let ch2 = str2[i].toLowerCase();
//         charCount1[ch1] = (charCount1[ch1] || 0) + 1;
//         charCount2[ch2] = (charCount2[ch2] || 0) + 1;
//     }
//     let isAnagram = true;
//     for (let ch in charCount1) {
//         if (charCount1[ch] !== charCount2[ch]) {
//             isAnagram = false;
//             break;
//         }
//     }
//     console.log(isAnagram ? "Anagram" : "Not Anagram");
// }

// List Prime Numbers between 1 to 100.
// Output : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.

// for(let i=1;i<100;i++){
//     let isPrime=true;

//     for(let j=2;j<=i/2;j++)
//         if(i%j==0)isPrime=false;

//     if(isPrime)console.log(i);
// }

// 2.	Pattern Logic
// 2.1
// 1
// 2 3
// 4 5 6

// let rows = 3;
// let num = 1;
// for (let i = 1; i <= rows; i++) {
//     let line = "";
//     for (let j = 1; j <= i; j++) {
//         line += num + " ";
//         num++;
//     }
//     console.log(line);
// }

// 	2.2
// *
// * *
// * * *

// let rows = 3;
// for (let i = 1; i <= rows; i++) {
//     let line = "";
//     for (let j = 1; j <= i; j++) {
//         line += "* ";
//     }
//     console.log(line);
// }

// // Factorial using recursion

// function fac(no){
//     if(no==1) return no;
//     return fac(no-1)*no;
// }
// console.log(fac(5));

// // Swap two variables without using the third variable
// // Input ->  a = 10; b = 13;
// // Output -> a = 13; b = 10;

// let a=10;
// let b=13;
// a=b+(a-(b=a));
// console.log(`a = ${a}`);
// console.log(`b = ${b}`);

// Pattern Logic

// 1
// 2 3
// 4 5 6

// let rows = 3;
// let no = 1;
// for (let i = 1; i <= rows; i++) {
//   let line = "";
//   for (let j = 1; j <= i; j++) {
//     line += no + " ";
//     no++;
//   }
//   console.log(line);
// }

// 1
// 1 1
// 1 1 1

// let rows = 3;
// for (let i = 1; i <= rows; i++) {
//   let line = "";
//   for (let j = 1; j <= i; j++) {
//     line += "1 ";
//   }
//   console.log(line);
// }

// // Get the revert array without using any array function
// // Input: [12, 43, 23, 67, 34, 87]
// // Output: [87, 34, 67, 23, 43, 12]

// let arr=[12, 43, 23, 67, 34, 87];
// let l=arr.length-1;
// for(let i=0;i<l/2;i++){
//     arr[i]=arr[l-i]+(arr[i]-(arr[l-i]=arr[i]))
// }
// console.log(arr);

// // The logic for Leap Year tc

// function leapyear(year) {
//   if (year % 400 === 0) return true;
//   if (year % 4 === 0 && year % 100 !== 0) return true;
//   return false;
// }

// let year = 2000;
// console.log(
//   leapyear(year) ? `${year} is a Leap year` : `${year} is not a Leap year`
// );

// // Count special characters and remove duplicate special characters by sorting the string.
// // Input: @@@O$$$$$K###
// // Count Special characters
// // Order by lower case,
// // Should not repeat any special characters
// // Output:
// // Count Special -> 11
// // Final String -> #$@ko

// let input = "@@@O$$$$$K###";
// let special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '|', '\\', '`', '~'];
// let count = 0;
// for (let i = 0; i < input.length; i++) {
//     if (special_chars.includes(input[i])) {
//         count++;
//     }
// }
// let set=new Set(input.toLowerCase().split(""));
// console.log(`Count Special -> ${count}`);
// console.log(`Final String -> ${[...set].join("")}`);

// without any inbuilt functions
// let input = "@@@O$$$$$K###";
// let special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '|', '\\', '`', '~'];
// let count = 0;
// let charMap = {};
// for (let i = 0; i < input.length; i++) {
//     let ch = input[i];
//     if (special_chars.includes(ch)) {
//         count++;
//     }
//     let lowerCh = ch.toLowerCase();
//     if (!charMap[lowerCh]) {
//         charMap[lowerCh] = true;
//     }
// }
// let finalString = "";
// for (let ch in charMap) {
//     finalString += ch;
// }
// console.log(`Count Special -> ${count}`);
// console.log(`Final String -> ${finalString}`);

// // Check Armstrong Number logic (An Armstrong number is the one whose value is equal to the sum of the cubes of its digits.)
// // Ex: 303(Non-Armstrong), 407 (Armstrong)

// let no=407;
// let n=no;
// let ans=0;
// while(no){
//     mod=no%10;
//     ans =ans+(mod*mod*mod);
//     no=Math.floor(no/10);
// }
// console.log(
//     n===ans
//         ? `${n} is Armstrong`
//         : `${n} is Non-Armstrong`
// );

// // Palindrome string.
// // Input: "MALAYALAM"
// // Output: Palindrome

// let input = "MALAYALAM";
// let arr = input.split("");
// let l = arr.length - 1;
// for (let i = 0; i < l/2; i++) {
//     let temp=arr[i];
//     arr[i]=arr[l-i];
//     arr[l-i]=temp;
// }
// console.log(input === arr.join("") ? `${input} is Palindrome` : `${input} is Non-Palindrome`);

// let input = "MALAYALAM";
// console.log(
//   input === input.split("").reverse().join("")
//     ? `${input} is Palindrome`
//     : `${input} is Non-Palindrome`
// );

// without any inbuilt functions
// let input = "MALAYALAM";
// let l = input.length - 1;
// let isPalindrome = true;
// for (let i = 0; i < l / 2; i++) {
//   if (input[i] !== input[l - i]) {
//     isPalindrome = false;
//     break;
//   }
// }
// console.log(
//   isPalindrome ? `${input} is Palindrome` : `${input} is Non-Palindrome`
// );

// // Give date for today:
// // Format the date properly
// // 25th October 2021, 12H 5M 30S

// let date=new Date();
// console.log(`${date.getDay()}th ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}, ${date.getHours()}H ${date.getMinutes()}M ${date.getSeconds()}S`);

// // Remove adjacent duplicate characters from a string
// // Ex :
// // Input: AAABBCDDDAAD
// // Output: ABCDAD

// let str="AAABBCDDDAAD"
// let nArr=str.split("").filter((ele,index)=>ele!==str[index+1])
// console.log(nArr.join(""));

// without any inbuilt functions
// let str = "AAABBCDDDAAD";
// let result = "";
// for (let i = 0; i < str.length; i++) {
//     if (str[i] !== str[i + 1]) {
//         result += str[i];
//     }
// }
// console.log(result);
