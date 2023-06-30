import http from "http";
import gfName from "./features.js";

import fs from "fs" // for file
const home = fs.readFileSync("./index.html") //synchronous file read
console.log(home);
const home2 = fs.readFile("./index.html", (err, home) => { //asynchronous file read
    console.log(home);
})




const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.end("<h1>noice</h1>");

    if (req.url === "/") {
        res.end(home)
    }

    else if (req.url === "/about") {
        res.end("About page");
    }
    else {
        res.end("Page not found")
    }
})
server.listen(5000, () => {
    console.log("Server is working");
});