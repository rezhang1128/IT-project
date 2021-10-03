const mongoose = require("mongoose");

const LinkageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    linkedSince: { type: Date, required: true, default: Date.now },
    lastConnection: { type: Date, required: true, default: Date.now },
    contactGoals: String,
    note: { type: String, required: false },
    events: { type: [mongoose.Schema.Types.ObjectId], required: false },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
  },
  { versionKey: false }
);

const EventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true, default: Date.now },
    linkages: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, required: true, default: "pending" },
    recurring: Date,
    note: String,
  },
  { versionKey: false }
);

module.exports = {
  Linkage: mongoose.model("Linkage", LinkageSchema),
  Event: mongoose.model("Event", EventSchema),
};
