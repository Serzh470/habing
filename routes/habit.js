const express = require("express");
const controller = require("../controllers/habit");
const router = express.Router();


router.get("/", controller.getAll)
router.post("/", controller.create)
router.get("/:id", controller.getById)
router.patch("/:id", controller.update)
router.delete("/:id", controller.delete)


module.exports = router;