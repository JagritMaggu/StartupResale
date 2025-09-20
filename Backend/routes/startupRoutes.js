const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.js")
const {
  createStartup,
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
  getAllStartups,
} = require("../controllers/startup.js");
const checkAuth = require("../middlewares/checkAuth.js");
// const {requireInvestor} = require("../middlewares/investorAuth.js")
router.post(
  "/",
  checkAuth,
  upload.fields([
    { name: "pan", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "incorporationCertUrl", maxCount: 1 },
    { name: "gstCertUrl", maxCount: 1 },
     { name: "pitchDeckUrl", maxCount: 1 },
  ]),
  createStartup
);

router.get("/", checkAuth, getStartups);
router.get("/allStartups", checkAuth,  getAllStartups)
router.get("/:id", checkAuth, getStartupById);
router.put(
  "/:id",
  checkAuth,
  upload.fields([
    { name: "pan", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "incorporationCertUrl", maxCount: 1 },
    { name: "gstCertUrl", maxCount: 1 },
    { name: "pitchDeckUrl", maxCount: 1 },
  ]),
  updateStartup
);
router.delete("/:id", checkAuth, deleteStartup);


module.exports = router;
