const http = require("http");
const fs = require("fs");
const url = require("url");

const tempOverview = fs.readFileSync("./templates/template-overview.html", "utf-8");
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync("./templates/template-product.html", "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%ID%}/g, product.id);
    output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    if (!product.organic) output = output.replace({%NOT_ORGANIC%}/g, product.image)
    return output ;
};
//
//................//
//
//..SERVER>>>>>>>>>>>>>>>>>>>>
const server = http.createServer((req, res) => {
    const {query,pathName } = url.parse(req.url,true)
    

    
    //OVERVIEW_Page---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (pathName === "/overview" || pathName === "/") {
        res.writeHead(200, "text/html");
        const cardsHtml = dataObj.map((el) =>  return replaceTemplate(tempCard, el).join());
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(tempOverview);

        //PRODUCT-PAGE--->>>>>>>>>>>>>>>>>>>>>>>>>>>>
    } else if (pathName === "/product") {
        console.log(query);
        res.end("This is the Product-Page!!....");
        console.log("This is the Product-Page!!....");

        //API->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    } else if (pathName === "/api") {
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
