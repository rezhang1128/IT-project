const mongoose = require("mongoose");


const UnionSchema = new mongoose.Schema(
    {
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