const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../middlewares/blogUpload");
 
// 👉 TipTap image upload (NEW)
router.post(
  "/upload-image",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
 
    res.status(200).json({
      url: `/uploads/blogs/${req.file.filename}`,
    });
  }
);
 
// 👉 Blog CRUD
router.post("/:id/like", blogController.likeBlog);
router.post("/", blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getSingleBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
 
module.exports = router;
 
 