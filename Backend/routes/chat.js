const express = require("express");
const router = express.Router();
const {previousChats} = require("../controllers/chathistory.js")
const checkAuth = require("../middlewares/checkAuth.js");

router.get("/chats/:id",checkAuth, previousChats)
router.post("/uploadFile", checkAuth)


module.exports = router