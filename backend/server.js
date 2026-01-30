
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Rgoutes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));


// DB
mongoose
  .connect("mongodb://127.0.0.1:27017/medical")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
