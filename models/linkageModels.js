const mongoose = require("mongoose");

const LinkageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: [String], required: true},
        address: { type: String, required: true },
        linkedSince: {type: Date, required: true, default: Date.now},
        lastConnection: {type: Date, required: true, default: Date.now},
        contactGoals: String,
        note: String,
        events: { type: [mongoose.Schema.Types.ObjectId], required: false },
        profilePic:
        {
            data: Buffer,
            contentType: String
        }
    },
    { versionKey: false }
);

const EventSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true },
        dateTime: { type: Date, required: true, default: Date.now },
        linkages: { type: mongoose.Schema.Types.ObjectId, required: true },
        status: {type: String, required: true, default:"pending"},
        recurring: Date,
        note: String,
      },
    { versionKey: false }
);



module.exports = {
  Linkage: mongoose.model("Linkage", LinkageSchema),
  Event: mongoose.model("Event", EventSchema),
};