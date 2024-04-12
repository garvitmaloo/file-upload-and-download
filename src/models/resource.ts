import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    ownerEmail: {
      type: String,
      required: true
    },
    signedUrl: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const Resources = mongoose.model("Resources", resourceSchema);
export default Resources;
