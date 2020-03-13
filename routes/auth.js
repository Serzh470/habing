const express = require("express");
const controller = require("../controllers/auth");
const router = express.Router();


// /api/auth/login
router.post("/login", controller.login)
// /api/auth/signup
router.post("/singup", controller.singup)


module.exports = router;
