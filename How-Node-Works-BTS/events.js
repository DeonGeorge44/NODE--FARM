const eventEmitter = require("events");
const http = require("http");

class Sales extends eventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("new-sale", () => {
    console.log("There was a new sale");
});

myEmitter.on("new-sale", () => {
    console.log("Customer name:Jonas");
});

myEmitter.on("new-sale", (stock) => {
    console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("new-sale", 9);

////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request-received");
    res.end("Request-received");
});

server.on("request", (req, res) => {
    console.log("REQUEST-2 RECEIVED");
    res.end("REQUEST-2 RECEIVED");
});

server.on("close", (req, res) => {
    console.log("SERVER-CLOSED");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests......");
});
