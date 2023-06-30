//express js:- A nodejs framework in a more syntacical manner

import express from 'express'
import path from 'path';

const app = express();



app.get("/", (req, res) => {
    console.log("hello");
    // res.sendStatus(400); //to send status code

    // res.send("Hello") //to send the data

    // res.json({ //to send the json data
    //     success: true,
    //     products: []
    // })

    // res.status(400).send("Jaldi waha se hato"); //chaining

    //read a html file a sending to the client
    const pathLocation = path.resolve();
    console.log(path.join(pathLocation, "./index.html"));
    res.sendFile(path.join(pathLocation, "./index.html"));
})

app.listen(5000, () => {
    console.log("Server is working");
})