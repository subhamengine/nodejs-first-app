//ejs:- It is simple templating language. 
// If we want to send dynamic html then we use ejs

import { log } from 'console';
import express from 'express'
import path from 'path'

const users = [];

const app = express();
app.use(express.urlencoded({ extended: true })) //middleware, we can access data from form as post request.

// app.use(express.static(path.join(path.resolve(), "public"))) //used to send the static file like html,css, etc from public folder.

app.set("view engine", "ejs") //setting up view engine for ejs


app.get("/", (req, res) => {
    //there is default "views" folder, inside with ejs file will the there.
    res.render("index", { name: "Subham" })

    // res.sendFile("index.html") //sendening static file
})

//form submit end point
app.post("/", (req, res) => {
    console.log(req.body);
    users.push({ username: req.body.name, email: req.body.email });
    res.render("success");
})

app.get("/users", (req, res) => {
    res.json({ users, });
})

app.listen(5000, () => {
    console.log("Server is working");
})