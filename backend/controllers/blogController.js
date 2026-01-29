const Blog = require("../models/Blog");

/* ================= CREATE BLOG ================= */
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      image: req.file.path,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created", blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
exports.updateBlog = async (req, res) => {
  const updateData = {
    title: req.body.title,
    content: req.body.content,
  };

  if (req.file) updateData.image = req.file.path;

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json({ message: "Blog updated", blog });
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
