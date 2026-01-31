const Gallery = require("../models/Gallery");

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    const gallery = new Gallery({
      title,
      description,
      image: req.file.path,
    });

    await gallery.save();
    res.status(201).json({ message: "Gallery item created", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= READ ================= */
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = { title, description };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ message: "Gallery updated", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
