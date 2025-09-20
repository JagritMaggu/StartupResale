const Startup = require("../models/Startup.js");
const cloudinary = require("../utils/cloudinary.js")
const createStartup = async (req, res) => {
  try {
    const { name, industry,  description, cin, gstin,  license,
                pan,
                idProof,
                stage,
                incorporationCertUrl,
                gstCertUrl,
                pitchDeckUrl,
              valuation } = req.body;
    // let panUrl, idUrl, licenseUrl, incorporationCertUrL, gstCertUrL, pitchDeckUrL;
    // if (req.files?.pan) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.pan[0].mimetype}; base64, 
    //             ${req.files.pan[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/pan" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   panUrl = result.secure_url;
    // }
    // if (req.files?.idProof) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.idProof[0].mimetype}; base64, 
    //             ${req.files.idProof[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/idProof" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   idUrl = result.secure_url;
    // }
    // if (req.files?.license) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.license[0].mimetype}; base64, 
    //             ${req.files.license[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/license" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   licenseUrl = result.secure_url;
    // }
    // if (req.files?.incorporationCertUrl) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.incorporationCertUrl[0].mimetype}; base64, 
    //             ${req.files.incorporationCertUrl[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/incorporationCertUrl" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   incorporationCertUrL=result.secure_url;
    // }
    // if (req.files?.gstCertUrl) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.gstCertUrl[0].mimetype}; base64, 
    //             ${req.files.gstCertUrl[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/gstCertUrl" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   gstCertUrL=result.secure_url;
    // }
    // if (req.files?.pitchDeckUrl) {
    //   const result = await cloudinary.uploader.upload(
    //     `data:${req.files.pitchDeckUrl[0].mimetype}; base64, 
    //             ${req.files.pitchDeckUrl[0].buffer.toString("base64")}
    //             `,
    //     { folder: "startups/pitchDeckUrl" }

    //     //folder means storing the data in startups on my cloudinary account
    //   );
    //   pitchDeckUrL=result.secure_url;
    // }

    const newStartup = await Startup.create({
      name,
      industry,
      stage,
      description,
      cin,
      gstin:gstin || null,
      license,
      pan,
      incorporationCertUrl,
      gstCertUrl,
      pitchDeckUrl,
      idProof,
      valuation,
      ownerId: req.user.id,
    });
    res.status(201).json(newStartup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({ ownerId: req.user.id }).populate("ownerId", "_id name email");
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    }).populate("ownerId", "_id name email");;
    if (!startup) return res.status(401).json({ message: "Startup not found" });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStartup = async (req, res) => {
  try {
   const updateData = {
      name: req.body.name,
      description: req.body.description,
      cin: req.body.cin,
      stage: req.body.stage,
      industry: req.body.industry,
      gstin: req.body.gstin,
    };
   
    const updated = await Startup.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user.id,
      },
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Startup not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStartup = async (req, res) => {
  try {
    const deleted = await Startup.findOneAndDelete({
      _id: req.params.id, 
      // the startup to be deleted
      ownerId: req.user.id,
      // the owner who's startup is to be deleted
    });

    if (!deleted) return res.status(404).json({ message: "Startup not found" });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllStartups = async(req,res)=>{

    try {
    // role guard
  

    const startups = await Startup.find({}).populate("ownerId", "_id name email");
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = {
  createStartup,
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
  getAllStartups
};
