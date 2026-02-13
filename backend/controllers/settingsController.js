const Settings = require("../models/Settings");

// GET SETTINGS
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE SETTINGS
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    settings.phone = req.body.phone;
    settings.email = req.body.email;
    settings.address1 = req.body.address1;
    settings.address2 = req.body.address2;
    settings.mapLink = req.body.mapLink;

    if (req.file) {
      settings.logo = req.file.path;
    }

    await settings.save();

    res.json({
      success: true,
      settings
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
