const express = require("express")
const Razorpay = require("razorpay")
const app = express()
app.use(express.static("./public"))
app.use(express.json())


// app.get("/", (req, res) => {
//     res.send("Hello")
// })

app.post("/order", async (req, res) => {
    const amount = req.body.amount

    var instance = new Razorpay({ key_id: process.env.YOUR_KEY_ID, key_secret: process.env.YOUR_SECRET })

    const myOrder = await instance.orders.create({
        amount: amount * 100, //amount is in the smallest currency unit
        currency: "INR",
        receipt: "receipt#1",
    })

    res.status(201).json({
        success: true,
        amount,
        order: myOrder
    })


})


app.listen(4000, () => console.log(`server is up and running at 4000`))