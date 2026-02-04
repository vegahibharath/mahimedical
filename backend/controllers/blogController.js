const Blog = require("../models/Blog");
 
/* ================= CREATE BLOG ================= */
exports.createBlog = async (req, res) => {
  try {
    console.log("📥 Incoming blog payload:", req.body);
 
    const { title, textContent } = req.body;
 
    const blog = new Blog({ title, textContent });
    await blog.save();
 
    console.log("💾 Saved blog in DB:", blog);
 
    res.status(201).json(blog);
  } catch (error) {
    console.error("❌ Blog save error:", error);
    res.status(500).json({ error: error.message });
  }
};
 
 
exports.updateBlog = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      textContent: req.body.textContent,
    };
 
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
 
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
 
/* ================= GET ALL BLOGS ================= */
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};
 
/* ================= GET SINGLE BLOG (VIEW COUNT) ================= */
exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } }, // 👈 view increase
    { new: true }
  );
  res.json(blog);
};
 
/* ================= LIKE BLOG ================= */
exports.likeBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } }, // 👈 like increase
    { new: true }
  );
  res.json({ message: "Blog liked", likes: blog.likes });
};
 
/* ================= UPDATE BLOG ================= */
 
 
/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};