const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user: {type:String, required:true, minlength:2, maxlength:100},
    password: {type:String, required:true, minlength:6, maxlength:100},
    createdAt: {type:Date, default: Date.now}
})

module.exports = mongoose.model("User",userSchema)