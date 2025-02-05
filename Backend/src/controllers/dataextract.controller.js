import path from "path";
import { fileURLToPath } from "url";
import { extractTextFromPDF, deleteTempFile } from "../services/dataextract.service.js"; // Import services

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file uploaded" });
    }
    const pdfPath = path.join(__dirname, "../../public/temp", req.file.filename);
    console.log("🔍 PDF Path:", pdfPath);
    const text = await extractTextFromPDF(pdfPath);
    await deleteTempFile(pdfPath);
    res.json({ text });
  } catch (error) {
    console.error("❌ Error extracting text:", error);
    res.status(500).json({ message: "Failed to extract text", error: error.message });
  }
};
