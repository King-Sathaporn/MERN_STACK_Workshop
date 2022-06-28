const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controller/authenController");

router.post("/login-admin", loginAdmin)

module.exports = router;