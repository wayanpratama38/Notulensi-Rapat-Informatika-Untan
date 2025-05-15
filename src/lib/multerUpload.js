import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Skip directory creation during build time
const isBuildPhase = process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

// Define a base directory that's safe for both development and production
// Use relative paths to avoid traversing Windows junctions
const BASE_DIR = process.env.UPLOAD_DIR || './public/uploads/documents';

// Use normalized absolute path only for operations, not for directory traversal
const getAbsolutePath = (relativePath) => {
  // Ensure path is relative and doesn't traverse up
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  return path.resolve(process.cwd(), safePath);
};

// Only create directories during runtime, not during build
if (!isBuildPhase) {
  try {
    const absolutePath = getAbsolutePath(BASE_DIR);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
      console.log(`Created upload directory: ${absolutePath}`);
    }
  } catch (err) {
    console.error(`Error creating upload directory:`, err);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Skip this during build phase
    if (isBuildPhase) {
      return cb(null, '/tmp');
    }
    
    // Get meetingId from query URL API call
    const meetingId = req.query.id;
    if (!meetingId) {
      return cb(new Error('Meeting ID is required for upload path'));
    }
    
    const meetingUploadDir = path.join(BASE_DIR, meetingId);
    const absoluteUploadDir = getAbsolutePath(meetingUploadDir);
    
    // Create subfolder if it doesn't exist
    if (!fs.existsSync(absoluteUploadDir)) {
      fs.mkdirSync(absoluteUploadDir, { recursive: true });
    }
    cb(null, absoluteUploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp-random-originalname.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_').replace(/_{2,}/g, '_'); // Sanitize filename
    cb(null, `${uniqueSuffix}-${safeOriginalName.replace(extension, '')}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Filter allowed file types
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true); // Accept file
  }
  // Reject file with error
  cb(new Error('File type not allowed! Only: JPEG, JPG, PNG, PDF, DOC, DOCX'));
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
    files: 6 // Maksimum 6 file
  }, 
  fileFilter: fileFilter,
});

export default upload;