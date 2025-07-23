import prisma from '@/lib/prisma';
import upload from '@/lib/multerUpload'; 
import { authenticate } from '@/lib/authMiddleware'; 
import multer from 'multer';


export const config = {
  api: {
    bodyParser: false,
  },
};


const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

async function handler(req, res) {
  const { id: meetingId } = req.query; 

  
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Rapat tidak ditemukan' });
    }
    
    if (meeting.status !== 'SELESAI') {
      return res.status(400).json({ message: `Dokumen hanya bisa dilengkapi jika status rapat adalah SELESAI. Status saat ini: ${meeting.status}` });
    }

    
    
    
    await runMiddleware(req, res, upload.array('dokumenRapat', 6));

    const { notulensiRapat } = req.body; 
    const files = req.files; 
    
    // Pastikan tidak ada lebih dari 6 file yang diupload
    if (files && files.length > 6) {
      return res.status(400).json({ 
        message: `Terlalu banyak file! Maksimal 6 file yang diperbolehkan. Anda mengunggah ${files.length} file.` 
      });
    }
    
    if (!notulensiRapat && (!files || files.length === 0)) {
      
      
      
      
      
      return res.status(400).json({ message: 'Notulensi atau setidaknya satu file dokumen harus diisi.' });
    }

    
    
    
    
    
    
    

    const documentData = files ? files.map(file => {
      
      const relativePath = `/uploads/documents/${meetingId}/${file.filename}`; 
      
  
      console.log(`Saving document record with path: ${relativePath}`); 
  
      return {
          namaFile: file.originalname,
          pathFile: relativePath, 
          tipeFile: file.mimetype,
      };
    }) : [];

    
    const updatedMeeting = await prisma.meeting.update({
      where: { id: meetingId },
      data: {
        notulensiRapat: notulensiRapat || null, 
        status: 'ARSIP', 
        documents: {
          create: documentData, 
        },
      },
      include: { 
        documents: true,
      }
    });

    res.status(200).json({ message: 'Dokumen berhasil dilengkapi dan status rapat diubah ke ARSIP.', data: updatedMeeting });

  } catch (error) {
    console.error("Error completing meeting document:", error);
    
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Ukuran salah satu file melebihi batas 5MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ message: `Terlalu banyak file diunggah. Maksimal 6 file diperbolehkan. Anda mencoba mengunggah lebih banyak.` });
    }
    if (error.message.includes('Tipe file tidak diizinkan')) {
        return res.status(400).json({ message: error.message });
    }
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: `Kesalahan unggah file: ${error.message}. Pastikan tidak lebih dari 6 file.` });
    }
    
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


export default authenticate(handler);