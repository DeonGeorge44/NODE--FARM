const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replacement.js");
const slugify = require("slugify");

const tempOverview = fs.readFileSync("./templates/template-overview.html", "utf-8");
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync("./templates/template-product.html", "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => {
    slugify(el.productName, { lower: true });
    console.log(slugs);
});
console.log(slugify("Fresh-Avacados", { lower: true }));

//
//................//
//
//..SERVER>>>>>>>>>>>>>>>>>>>>
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    //OVERVIEW_Page---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (pathname === "/overview" || pathName === "/") {
        res.writeHead(200, "text/html");
        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el).join());
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(tempOverview);

        //PRODUCT-PAGE--->>>>>>>>>>>>>>>>>>>>>>>>>>>>
    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-type": "text/html" });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end("This is the Product-Page!!....");
        console.log("This is the Product-Page!!....");

        //API->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    } else if (pathname === "/api") {
        fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
            const productData = JSON.parse(data);
            console.log(productData);

            res.writeHead(200, { "Content-type": "application/json" });
            res.end(data);
        });
    } else {
        //NOT-FOUND---->>>>>>>>>>>>
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "text/html",
        });
        res.end("<h1> PAGE NOT FOUND </h1>");
        console.log("PAGE NOT FOUND");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("LISTENING TO PORT ON 8000....");
});
