
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

async function handler(req, res) {
  const { id: participantId } = req.query;

  if (req.method === 'GET') {
    
    try {
      const participant = await prisma.participant.findUnique({
        where: { id: participantId },
      });
      if (!participant) {
        return res.status(404).json({ message: 'Peserta tidak ditemukan' });
      }
      res.status(200).json(participant);
    } catch (error) {
      console.error(`Error fetching participant ${participantId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { nama, email, tandaTangan } = req.body;
      
      const updatedParticipant = await prisma.participant.update({
        where: { id: participantId },
        data: { nama, email, tandaTangan }, 
      });
      res.status(200).json(updatedParticipant);
    } catch (error) {
      console.error(`Error updating participant ${participantId}:`, error);
       if (error.code === 'P2025') {
           return res.status(404).json({ message: 'Peserta tidak ditemukan' });
       }
       if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
         return res.status(409).json({ message: 'Email sudah digunakan oleh peserta lain.' });
       }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    
    
    
    try {
      await prisma.participant.delete({ where: { id: participantId } });
      res.status(200).json({ message: 'Peserta berhasil dihapus' }); 
    } catch (error) {
       console.error(`Error deleting participant ${participantId}:`, error);
       if (error.code === 'P2025') {
           return res.status(404).json({ message: 'Peserta tidak ditemukan' });
       }
       
       if (error.code === 'P2003') { 
            return res.status(409).json({ message: 'Tidak bisa menghapus peserta karena masih tercatat dalam rapat.' });
       }
       res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 