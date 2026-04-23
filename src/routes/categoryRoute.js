const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.remove);

module.exports = router;