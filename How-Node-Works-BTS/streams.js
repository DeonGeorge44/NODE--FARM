//setting-up-Streams
const fs = require("fs");
const server = require("http").createServer();

//Solution -1

// server.on("request", (req, res) => {
//     fs.readFile("./text-file.txt", (err, data) => {
//         if (err) console.log(err);
//         res.end(data);
//     });
// });

// server.listen(8000, "127.0.0.1", () => {
//     console.log("Listening--to--the--PORT....");
// });

//Solution-2
// server.on("request", (req, res) => {
//     const readable = fs.createReadStream("./ttext-file.txt");
//     readable.on("data", (chunk) => res.write(chunk));
//     readable.on("end", () => res.end());
//     readable.on("error", (err) => {
//         console.log(err);
//         res.statusCode = 500;
//         res.end("File-Not-Found");
//     });
// });

//Solution-3

server.on("request", (req, res) => {
    const readable = fs.createReadStream("./text-file.txt");
    readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening---TO---The--PORT......");
});
