const News = require("../models/News");

/* ===== CREATE NEWS ===== */
exports.createNews = async (req, res) => {
  try {
    const { title, snippet, postedBy } = req.body;
    const news = new News({ title, snippet, postedBy });
    await news.save();
    res.status(201).json({ message: "News posted", news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== GET ALL NEWS ===== */
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== GET SINGLE NEWS (increment views) ===== */
exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // increment views
      { new: true }
    );
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== UPDATE NEWS ===== */
exports.updateNews = async (req, res) => {
  try {
    const { title, snippet, isLive } = req.body;
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { title, snippet, isLive },
      { new: true }
    );
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News updated", news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== DELETE NEWS ===== */
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
