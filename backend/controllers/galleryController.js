const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const gallery = new Gallery({
      title: req.body.title,
      description: req.body.description,
      image: `gallery/${req.file.filename}`,
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
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      // Delete old image
      const oldImagePath = path.join(
        __dirname,
        "../../uploads",
        gallery.image
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      updateData.image = `gallery/${req.file.filename}`;
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ message: "Gallery updated", gallery: updated });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Delete image file
    const imagePath = path.join(
      __dirname,
      "../../uploads",
      gallery.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await gallery.deleteOne();

    res.status(200).json({ message: "Gallery deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};