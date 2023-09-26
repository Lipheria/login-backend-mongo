const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String
})


const userModel = mongoose.model("registers", userSchema)
module.exports = userModel
