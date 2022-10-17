const User = require("../models/User")
const bcrypt = require("bcryptjs")

const defaultRender = (req,res)=>{
    try {
        res.render("index")
    } catch (error) {
        res.send(error)
    }
}
const verifyLogin = async(req,res)=>{
    const selectedUser = await User.findOne({user:req.body.user})
    console.log(selectedUser)
        if(!selectedUser) {
            res.send("User ou senha incorreta")
            return res.render("index")
        }
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send("User ou senha incorreta")
        
        
        res.redirect(`grupo${req.body.room}/`)
}

const addUser = async(req,res)=>{
    
    const user = new User({
        user: req.body.user,
        password: bcrypt.hashSync(req.body.password)
    })
    try {
        let saveUser = await user.save()
        res.redirect("/")
    } catch (error) {
        res.send("ERRO")
        res.render("add", {error, body:req.body})
    }
}

module.exports = {defaultRender, verifyLogin, addUser}