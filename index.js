const express = require("express")
require("dotenv").config();
const app = express();
const path = require("path")
const port = 3000
const linkRoute = require("./routers/linkRoutes")
const mongoose = require("mongoose")
const socketIo = require("socket.io")

mongoose.connect(process.env.MONGO_CONNECTION_URL, 
    {
        useNewUrlParser:true, 
    useUnifiedTopology: true
}, (error)=>{
    if(error)
    console.log(error)
})


app.use("/", linkRoute)

app.use("/grupo1", express.static(path.join(__dirname, "public")))
app.use("/grupo2", express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "templates"))
const server = app.listen(port, ()=> console.log(`Example app listen on port ${port}`))

// messages

const messages = {grupo1:[], grupo2:[]}

const io = socketIo(server)

const grupo1 = io.of("/grupo1").on("connection", (socket)=>{

    socket.emit("update_messages", messages.grupo1)

    socket.on("new_messages", (data)=>{

        messages.grupo1.push(data)

        grupo1.emit("update_messages", messages.grupo1)
    })
})

const grupo2 = io.of("/grupo2").on("connection", (socket)=>{

    socket.emit("update_messages", messages.grupo2)

    socket.on("new_messages", (data)=>{

        messages.grupo2.push(data)

        grupo2.emit("update_messages", messages.grupo2)
    })
})