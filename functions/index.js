const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51KOQwtSG6G0QGYdv8WH9hQbjsQe81i0qnWmDiXVycSWSMVJ6l55UjbHQR9Klx9OQvyfhtDRE9OURNDX6ns3OyDBb00l1HGSF8o")

// creating API

// APP config
const app = express()

// Midllerwares
app.use(cors({ origin: true }))
app.use(express.json())

// Routes
app.get("/", (req, res) => res.status(200).send("Hello stripe"))
app.get("/user", (req, res) => res.status(200).send("Hello user"))

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    console.log("Payment request recieved", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // in lowest denomination(paise) of the currency
        currency: "inr"
    });
    // res.status(201).send("OK, created")
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command
exports.api = functions.https.onRequest(app)

// GOT THIS URL FROM TERMINAL
// http://localhost:5001/clone-2001/us-central1/api