import express from 'express';
import { extractText } from '../controllers/dataextract.controller.js';  // Adjust path as necessary
import { upload } from '../middleware/multer.middleware.js';
const router = express.Router();

// Route for text extraction from uploaded PDF
router.post('/', upload.single('file'), extractText);

export default router;