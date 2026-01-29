const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const galleryController = require("../controllers/galleryController");

router.post(
  "/",
  upload.single("image"),
  galleryController.createGallery
);

router.get("/", galleryController.getAllGallery);

router.put(
  "/:id",
  upload.single("image"),
  galleryController.updateGallery
);

router.delete("/:id", galleryController.deleteGallery);

module.exports = router;
