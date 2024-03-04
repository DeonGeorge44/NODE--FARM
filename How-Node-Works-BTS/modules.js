// console.log(arguments);
// console.log(require("module").wrapper);
const fs = require("fs");

//module.exports
const C = require("./textModule-1");
const calc1 = new C();
console.log(calc1.add(2, 8));

//exports
// const calc2 = require("./textModule-2");
const { add, multiply, divide } = require("./textModule-2");
console.log(multiply(2, 5));

//caching
require("./textModule-3")();
require("./textModule-3")();
require("./textModule-3")();
