const multer = require("multer");
const path = require("path");
const fs = require("fs");

// absolute path to uploads/blogs
const uploadPath = path.join(__dirname, "../../uploads/blogs");

// ✅ Ensure folder exists BEFORE multer runs
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;