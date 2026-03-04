import mongoose from "mongoose";

const userPdfSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  pdfUrl: String,
  downloadUrl: String
});

export default mongoose.model("UserPdf", userPdfSchema);
