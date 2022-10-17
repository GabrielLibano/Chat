const express = require("express")
const router = express.Router()
const linkController = require("../Controllers/controllers")
const app = express();
const path = require("path")

router.get("/", linkController.defaultRender)
router.get("/add", (req,res) => res.render("add", {error:false, body:{} }))




router.post("/add", express.urlencoded({extended:true}), linkController.addUser)
router.post("/", express.urlencoded({extended:true}), linkController.verifyLogin)

module.exports = router