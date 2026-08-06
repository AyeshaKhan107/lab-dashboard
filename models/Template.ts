import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    title: String,

    testName: String,

    patient: Object,

    rows: Array,

    columns: Array,

    locked: {
      type: Boolean,
      default: false,
    },

    footerText: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);