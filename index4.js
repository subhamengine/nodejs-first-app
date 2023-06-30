//mongoDb


import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'; //used to secure tokens
import { log } from 'console';
import bcrypt from "bcrypt"; //for encrypting passwords

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
}).then(() => console.log("Database connected")).catch((err) => console.log(err))


//schema for database

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});


//model creation or creating a new collection
const User = mongoose.model("User", userSchema);



const app = express();
app.use(express.urlencoded({ extended: true })) //middleware, we can access data from form as post request.
app.use(cookieParser()); //to access cookies in the server side
app.set("view engine", "ejs") //setting up view engine for ejs


//middleware function for authentication
//next is used to call the next handler 
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        //decoding token and verying
        const decoded = jwt.verify(token, "ghjijbiuoh")
        req.user = await User.findById(decoded._id) //sending the user data to the request
        next();
    }
    else {
        res.redirect("/login");
    }
}


// app.get("/", (req, res) => {
//     const { token } = req.cookies;
//     //login - logout page
//     if (token) {
//         res.render("logout");
//     }
//     else {
//         res.render("login");
//     }

// })

//authentication -2nd type
app.get("/", isAuthenticated, (req, res) => {

    res.render("logout", { name: req.user.name })
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/logout", async (req, res) => {
    res.cookie("token", "null", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.redirect("/");
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
        return res.redirect("/register");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.render("login", { email, message: "Password Incorrect" })
    }
    const token = jwt.sign({ _id: user._id }, "ghjijbiuoh");
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    })
    res.redirect("/")

})
//authentication
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body.email);

    let user = await User.findOne({ email })
    if (user) {
        return res.redirect("/login");
    }

    //hashing password before saving it into db
    const hashedPass = await bcrypt.hash(password, 10);



    user = await User.create({
        name,
        email,
        password: hashedPass,
    })

    //encodind user id into token
    const token = jwt.sign({
        _id: user._id
    }, "ghjijbiuoh")


    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    })
    res.redirect("/");
})

app.listen(5000, () => {
    console.log("Server is working");
})