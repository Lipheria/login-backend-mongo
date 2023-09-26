const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const userModel = require("./models/user")
const url = "mongodb+srv://lipheria:samurott@cluster0.bbpwnrj.mongodb.net/plantidb?retryWrites=true&w=majority"

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: ["https://login-backend-mongo.vercel.app"],
        methods: ["POST", "GET"],
        crendentials: true
    }
))


const connectDB = async () =>{
    try{
        await mongoose.connect(url)
        console.log("Connected")
    }catch(error){
        console.log("No connect")
    }
}

connectDB()

app.get("/", (req, res) =>{
    res.send("Hello Cheese")
})

app.get("/login", (req, res) =>{
    res.send("Hello Login API")
})

app.get("/register", (req, res) =>{
    res.send("Hello Register API")
})

//mongoose.connect(url)


app.post("/login", (req, res) =>{
    console.log("Login API")
    const{loginuserName, loginPassword} = req.body;
    userModel.findOne({userName:loginuserName})
    .then(user => {
        if(user){
            if(user.password === loginPassword){
                res.json("Success")
            } else{
                res.json("Password is incorrect")
            }
        } else{
            res.json("Account not found")
        }
    })
})



app.post("/register", (req, res) => {
    userModel.insert(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})
