const fs = require("fs");

// const txtIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(txtIn);

// const txtOut = `this is what we know about avacado:.............. ${txtIn}`;
// fs.writeFileSync("./txt/output.txt", txtOut);
// console.log("FILE WRITTEN!!!....");

//Blocking,Synchronous Way
const textIn = fs.readFileSync("txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we know about avacado:... ${textIn}.\nCreated on ${Date.now()} `;
console.log("File Written!!!!!!!!!!!!!!!!!!!!!!!!!!........................");

//Non-Blocking, Asynchronous-Way
fs.readFile("./txt/startttttt.txt", (err, data1) => {
    if (err) return console.log("ERROR!😵‍💫🎇");
    fs.readFile(`./txt/${data1}.txt`, (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            console.log(data3);

            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
                console.log("Your File Has Been WRRIIIITTENNNNNNN!!!!......");
            });
        });
    });
});
console.log("will Read File");
