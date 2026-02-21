const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

/* ================= CREATE BLOG ================= */
exports.createBlog = async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      textContent: req.body.textContent,
    };

    if (req.file) {
      blogData.image = `blogs/${req.file.filename}`;
    }

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json(blog);

  } catch (error) {
    console.error("Blog save error:", error);
    res.status(500).json({ error: error.message });
  }
};


/* ================= UPDATE BLOG ================= */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updateData = {
      title: req.body.title,
      textContent: req.body.textContent,
    };

    if (req.file) {
      // Delete old image if exists
      if (blog.image) {
        const oldPath = path.join(
          __dirname,
          "../../uploads",
          blog.image
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.image = `blogs/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Blog updated", blog: updated });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= GET ALL BLOGS ================= */
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};


/* ================= GET SINGLE BLOG ================= */
exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  res.json(blog);
};


/* ================= LIKE BLOG ================= */
exports.likeBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  res.json({ message: "Blog liked", likes: blog.likes });
};


/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete image if exists
    if (blog.image) {
      const imagePath = path.join(
        __dirname,
        "../../uploads",
        blog.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await blog.deleteOne();

    res.json({ message: "Blog deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};