//mongoDb


import express from 'express'
import path from 'path'
import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
}).then(() => console.log("Database connected")).catch((err) => console.log(err))


//schema for database

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});


//model creation or creating a new collection
const Message = mongoose.model("Message", messageSchema);



const app = express();
app.use(express.urlencoded({ extended: true })) //middleware, we can access data from form as post request.
app.set("view engine", "ejs") //setting up view engine for ejs





app.get("/", (req, res) => {
    res.render("index")
})

app.get("/add", (req, res) => {
    Message.create({
        name: "Subham",
        email: "Sample"
    }).then(() => {
        res.send("Nice")
    }).catch((err) => {
        res.send(err)
    })

})

app.get("/success", (req, res) => {
    res.render("Success");
})


//form submit end point
app.post("/contact", async (req, res) => {
    console.log(req.body);
    const messageData = { name: req.body.name, email: req.body.email };
    await Message.create(messageData);
    res.redirect("success");
})

app.get("/users", (req, res) => {
    res.json({ users, });
})

app.listen(5000, () => {
    console.log("Server is working");
})