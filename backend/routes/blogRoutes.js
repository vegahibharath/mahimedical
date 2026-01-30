
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const blogUpload = require("../middlewares/blogUpload");

router.post("/", blogUpload.single("image"), blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getSingleBlog);
router.put("/:id", blogUpload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.post("/like/:id", blogController.likeBlog);
module.exports = router;
