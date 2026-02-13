const Therapist = require("../models/Therapist");

// ✅ Add Therapist (Admin)
exports.addTherapist = async (req, res) => {
  try {
    console.log("===== ADD THERAPIST HIT =====");
    console.log("CONTENT-TYPE:", req.headers["content-type"]);
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const {
      name,
      specialization,
      bio,
      contact,
      qualification,
      additionalInformation,
      practicingDetails,
      address,
    } = req.body;

    console.log("PARSED FIELDS:", {
      name,
      specialization,
      bio,
      contact,
      qualification,
      additionalInformation,
      practicingDetails,
      address,
    });

    // Required validation
    if (
      !name ||
      !specialization ||
      !bio ||
      !contact ||
      !qualification ||
      !address
    ) {
      console.log("❌ VALIDATION FAILED");
      return res.status(400).json({
        message: "All required fields must be filled",
        debug: {
          name: !!name,
          specialization: !!specialization,
          bio: !!bio,
          contact: !!contact,
          qualification: !!qualification,
          address: !!address,
        },
      });
    }

    if (!req.file) {
      console.log("❌ IMAGE MISSING");
      return res.status(400).json({ message: "Image is required" });
    }

    const therapist = await Therapist.create({
      name,
      specialization,
      bio,
      image: req.file.path,
      contact,
      qualification,
      additionalInformation,
      practicingDetails,
      address,
    });

    console.log("✅ THERAPIST CREATED:", therapist._id);

    res.status(201).json({
      message: "Therapist added successfully",
      therapist,
    });
  } catch (error) {
    console.error("🔥 ADD THERAPIST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: therapists.length,
      therapists,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✏️ UPDATE THERAPIST (Admin)
exports.updateTherapist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      specialization,
      bio,
      contact,
      qualification,
      additionalInformation,
      practicingDetails,
      address,
    } = req.body;
console.log("BODY:", req.body);
console.log("FILE:", req.file);

    const therapist = await Therapist.findById(id);
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    therapist.name = name || therapist.name;
    therapist.specialization = specialization || therapist.specialization;
    therapist.bio = bio || therapist.bio;
    therapist.contact = contact || therapist.contact;
    therapist.qualification = qualification || therapist.qualification;
    therapist.additionalInformation =
      additionalInformation || therapist.additionalInformation;
    therapist.practicingDetails =
      practicingDetails || therapist.practicingDetails;
    therapist.address = address || therapist.address;

    if (req.file) {
      therapist.image = req.file.path;
    }

    await therapist.save();

    res.status(200).json({
      message: "Therapist updated successfully",
      therapist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑 DELETE THERAPIST (Admin)
exports.deleteTherapist = async (req, res) => {
  try {
    const { id } = req.params;

    const therapist = await Therapist.findById(id);
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    await therapist.deleteOne();

    res.status(200).json({
      message: "Therapist deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.likeTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    therapist.likesCount += 1;
    await therapist.save();

    res.json({
      success: true,
      likesCount: therapist.likesCount
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET SINGLE THERAPIST (For Share Profile)
exports.getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.json(therapist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



