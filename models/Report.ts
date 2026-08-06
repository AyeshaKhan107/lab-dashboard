

// import mongoose from "mongoose";

// const ReportSchema = new mongoose.Schema(
//   {
//     serial: { type: String, required: true, unique: true },
//     patientName: { type: String, required: true },
//     fileUrl: { type: String, required: true },
//     qrLink: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Report ||
//   mongoose.model("Report", ReportSchema);




import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    title: String,
    patient: Object,
    rows: Array,
  },
  {
    timestamps: true,
  }
);

const Report =
  mongoose.models.Report ||
  mongoose.model("Report", ReportSchema);

export default Report;