import express from 'express';
import cors from 'cors';
import path from 'path';
import dataextractRoutes from './src/routes/dataextract.routes.js';  // Adjust the path if needed
import { fileURLToPath } from 'url';

// Manually define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public'))); // Now __dirname works

// Register routes
app.use('/api/dataextract', dataextractRoutes);

// Set the server to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
