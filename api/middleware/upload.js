import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`); // Generate unique file name
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF allowed.'), false);
  } else {
    cb(null, true);
  }
};

// Limit file size (optional)
const limits = { fileSize: 2 * 1024 * 1024 }; // 2 MB limit

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits
});

export default upload;
