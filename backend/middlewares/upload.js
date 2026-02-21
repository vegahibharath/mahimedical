const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to uploads/gallery
const uploadPath = path.join(__dirname, "../../uploads/gallery");

// ✅ Always ensure folder exists
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;