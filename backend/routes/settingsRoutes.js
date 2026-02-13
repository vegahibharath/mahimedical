const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const adminAuth = require("../middlewares/adminAuth");

const {
  getSettings,
  updateSettings
} = require("../controllers/settingsController");

router.get("/", getSettings);

router.put(
  "/",
  adminAuth,
  upload.single("logo"),
  updateSettings
);

module.exports = router;
