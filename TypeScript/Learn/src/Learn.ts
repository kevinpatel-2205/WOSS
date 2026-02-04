let value: unknown;
value = "hello";
value=123;
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
console.log(typeof(value));

function logMessage(msg: string): void {
  console.log(msg);
}
logMessage("Kevin");

const a="kevin";
let b=213;
var c=true;
console.log(typeof(a));
console.log(typeof(b));
console.log(typeof(c));

let numbers = [1, 2, 3];
console.log(typeof(numbers));
console.log(numbers.push(4));
console.log(numbers);

let user = {
  id: 1,
  name: "Kevin",
};

function k(name:string, age:number){
  console.log(name, age);
}

k("kevin",21);

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
console.log(x)
}
configure({ width: 100 });
configure("auto");
configure({width:100});
configure("auto");


let Fname: "kevin" | "patel" | 2205;
Fname = "kevin";
console.log(Fname);
Fname = "patel";
console.log(Fname);
Fname = 2205;
console.log(Fname);


const mName="kevin"
let age=21;
console.log(typeof(mName));
console.log(typeof(age));


type User = {
  id: number;
  name: string;
  role: "user" | "admin";
};
const User: User = {
  id: 1,
  name: "Kevin",
  role: "admin",
};
console.log(User);


enum Status {
  Active,
  Inactive,
  Pending,
}
function setStatus(status: Status) {
  console.log(status);
}
setStatus(Status.Pending);  
setStatus(1);              


type HttpMethod = "GET" | "POST";
type Route = `/api/${string}`;

const r1: Route = "/api/users"; //
// const r2: Route = "/user/list"; //

console.log(r1);