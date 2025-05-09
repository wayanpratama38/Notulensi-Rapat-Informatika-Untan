
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

async function handler(req, res) {
  if (req.method === 'GET') {
    
    try {
        
      const participants = await prisma.participant.findMany({
        orderBy: { nama: 'asc' } 
      });
      res.status(200).json(participants);
    } catch (error) {
      console.error("Error fetching participants:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    
    try {
      const { nama, email, tandaTangan } = req.body;
      if (!nama) {
        return res.status(400).json({ message: 'Nama peserta wajib diisi' });
      }
      

      const newParticipant = await prisma.participant.create({
        data: {
          nama,
          email, 
          tandaTangan 
        },
      });
      res.status(201).json(newParticipant);
    } catch (error) {
      console.error("Error creating participant:", error);
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        
        return res.status(409).json({ message: 'Email sudah digunakan oleh peserta lain.' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 