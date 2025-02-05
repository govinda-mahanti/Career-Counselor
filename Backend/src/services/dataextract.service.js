import fs from "fs";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

const { GlobalWorkerOptions } = pdfjsLib;
GlobalWorkerOptions.workerSrc = null;

const extractTextFromPDF = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found on server");
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdf = await pdfjsLib.getDocument({ data: dataBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }

    return text;
  } catch (error) {
    throw new Error(`Failed to extract text: ${error.message}`);
  }
};

const deleteTempFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject("⚠️ Failed to delete temporary file:", err);
      } else {
        console.log("🗑️ Temporary file deleted.");
        resolve();
      }
    });
  });
};

export { extractTextFromPDF, deleteTempFile };
