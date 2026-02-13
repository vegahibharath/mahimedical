const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { addTherapist,getAllTherapists,  updateTherapist,
  deleteTherapist,likeTherapist,getTherapistById } = require("../controllers/therapistController");
const adminAuth = require("../middlewares/adminAuth");
// Admin adds therapist
router.post(
  "/add",adminAuth,
  upload.single("image"),
  addTherapist
);
router.get("/all",adminAuth, getAllTherapists);
router.get("/userall",getAllTherapists);
router.put(
  "/update/:id",
  adminAuth,
  upload.single("image"),
  updateTherapist
);
 
// 🗑 Delete
router.delete(
  "/delete/:id",
  adminAuth,
  deleteTherapist
);
router.put("/like/:id",likeTherapist);

router.get("/:id", getTherapistById);

module.exports = router;