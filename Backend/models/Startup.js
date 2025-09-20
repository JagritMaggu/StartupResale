const { Schema, model, default: mongoose } = require("mongoose");

const startupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    license: {
      type: String,
      required: true,
    },
    valuation: {
      type: String,
      required: true,
    },
    // file
    pan: {
      type: String,
      required: true,
    },
     // file
    idProof: {
      type: String,
      required: true,
    },
     // file
    industry: { type: String },
    stage: {
      type: String,
      enum: ["Idea", "Early", "Growth", "Mature"],
      required: true,
    },
    description: { type: String, required:true },
    cin:{type:String,  required: true},
    
    gstin:{type:String},

    incorporationCertUrl:{type:String,  required: true},
     // file
    gstCertUrl:{type:String},
     // file
    pitchDeckUrl:{type:String},
     // file

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Startup = model("Startup", startupSchema);

module.exports = Startup;
