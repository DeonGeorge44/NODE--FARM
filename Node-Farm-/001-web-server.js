const http = require("http");

//
//................//
//
//..SERVER>>>>>>>>>>>>>>>>>>>>
const server = http.createServer((req, res) => {
    console.log(req);
    res.end("HELLUU FROM THE SERVER!!!...");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("LISTENING TO PORT ON 8000....");
});
