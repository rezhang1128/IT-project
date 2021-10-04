const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    StartTime: { type: Date, required: true, default: Date.now },
    EndTime: { type: Date, required: true, default: new Date(new Date().setHours(new Date().getHours() + 2))},
    linkages: { type: [mongoose.Schema.Types.ObjectId], required: false },
    union: { type: [mongoose.Schema.Types.ObjectId], required: false },
    status: { type: String, required: true, default: "pending" },
    recurring: Date,
    note: String,
  },
  { versionKey: false }
);

module.exports = {
  Task: mongoose.model("Task", TaskSchema),
};
