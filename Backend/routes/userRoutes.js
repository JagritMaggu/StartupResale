const express = require("express");
const router = express.Router();
const {fetchUser} = require("../controllers/fetchuser.js")
const checkAuth = require("../middlewares/checkAuth.js");
const { getAllfounders } = require("../controllers/founders.js");
const { getAllinvestors } = require("../controllers/investors.js");

router.get("/fetchUser", checkAuth, fetchUser)
router.get("/founders", checkAuth, getAllfounders)
router.get("/investors", checkAuth, getAllinvestors)

module.exports=router