import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Tentukan direktori penyimpanan (di dalam folder public agar bisa diakses jika perlu)
// PERHATIAN: Menyimpan upload di public bisa menimbulkan risiko keamanan jika tidak ditangani dengan benar.
// Alternatif: Simpan di luar folder public dan buat endpoint khusus untuk serve file.
const uploadDir = path.join(process.cwd(), 'public/uploads/documents');

// Buat direktori jika belum ada (sinkron karena ini bagian setup)
try {
  if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log(`Created upload directory: ${uploadDir}`);
  }
} catch (err) {
  console.error(`Error creating upload directory ${uploadDir}:`, err);
  // Anda mungkin ingin menghentikan aplikasi jika direktori upload tidak bisa dibuat
  // throw new Error(`Failed to create upload directory: ${err.message}`);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Simpan langsung ke direktori utama 'documents'
    
    // --- CONTOH JIKA INGIN SUBFOLDER PER MEETING ---
    const meetingId = req.query.id; // Ambil ID dari query URL API call
    if (!meetingId) {
      return cb(new Error('Meeting ID is required for upload path'));
    }
    const meetingUploadDir = path.join(uploadDir, meetingId);
    // Buat subfolder jika belum ada
    if (!fs.existsSync(meetingUploadDir)){
        fs.mkdirSync(meetingUploadDir, { recursive: true });
    }
    cb(null, meetingUploadDir);
    // --- AKHIR CONTOH SUBFOLDER ---
  },
  filename: function (req, file, cb) {
    // Buat nama file unik: timestamp-random-namaasli.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_').replace(/_{2,}/g, '_'); // Sanitasi nama file
    cb(null, `${uniqueSuffix}-${safeOriginalName.replace(extension, '')}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Filter tipe file yang diizinkan
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true); // Terima file
  }
  // Tolak file dengan error
  cb(new Error('Tipe file tidak diizinkan! Hanya: JPEG, JPG, PNG, PDF, DOC, DOCX'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
  fileFilter: fileFilter,
});

export default upload;