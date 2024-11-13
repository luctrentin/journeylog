// backend/index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads' folder

// Define the upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});