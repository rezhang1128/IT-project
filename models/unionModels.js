const mongoose = require("mongoose");


const UnionSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      linkages: { type: [mongoose.Schema.Types.ObjectId], required: true },
      profilePic:
      {
          data: Buffer,
          contentType: String
      }
    },
    { versionKey: false }
  );


module.exports = {
  Union: mongoose.model("Union", UnionSchema),
};