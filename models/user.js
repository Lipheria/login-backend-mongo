const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String
})


const userModel = mongoose.model("register", userSchema)
module.exports = userModel