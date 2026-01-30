const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Create news
router.post("/", newsController.createNews);

// Get all news
router.get("/", newsController.getAllNews);

// Get single news (increment views)
router.get("/:id", newsController.getSingleNews);

// Update news
router.put("/:id", newsController.updateNews);

// Delete news
router.delete("/:id", newsController.deleteNews);

module.exports = router;
