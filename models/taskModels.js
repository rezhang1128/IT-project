const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    StartTime: { type: Date, required: true, default: Date.now },
    EndTime: { type: Date, required: true, default: new Date(new Date().setHours(new Date().getHours() + 2))},
    linkages: { type: [mongoose.Schema.Types.ObjectId], required: false },
    union: { type: [mongoose.Schema.Types.ObjectId], required: false },
    status: { type: String, required: false, default: "pending" }, // other type will be "overdue" and "complete"
    recurring: {type:String,required:false},
    note: {type:String,required:false},
  },
  { versionKey: false }
);

module.exports = {
  Task: mongoose.model("Task", TaskSchema),
};
