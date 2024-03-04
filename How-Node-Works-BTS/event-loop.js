const fs = require("fs");
const crypto = require("crypto");
const { start } = require("repl");

const start = Date.now();
process.env.THREADPOOL_SIZE = 1;

setTimeout(() => {
    console.log("Timer 1 Finished");
});

setImmediate(() => {
    console.log("Immediate 1 finished");
});

fs.readFile("./text-file.txt", () => {
    console.log(" I/O---Finished ");
    console.log("---------------");
});

setTimeout(() => {
    console.log("Timer 2 Finished");
});
setTimeout(() => {
    console.log("Timer 3 Finished ");
}, 3000);

setImmediate(() => {
    console.log("Immediate 2 finished");
});

process.nextTick(() => console.log("process.nextTick"));

console.log("Hello from the top level code");

crypto.pbkdf2("password", "alt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password-encrypted");
});
crypto.pbkdf2("password", "alt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password 2-encrypted");
});
crypto.pbkdf2("password", "alt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password 3 -encrypted");
});
crypto.pbkdf2("password", "alt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password 4 -encrypted");
});
crypto.pbkdf2("password", "alt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password 5 -encrypted");
});
