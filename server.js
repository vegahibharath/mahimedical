const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/therapists", require("./routes/therapistRoutes"));
// DB
mongoose
  .connect("mongodb://127.0.0.1:27017/mahi_medical")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
