import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';

async function handler(req, res) {
  const { id: userId } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true,
          image: true
        }
      });
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { nama, email, tandaTangan, role } = req.body;
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { nama, email, tandaTangan, role }, 
        select: {
          id: true,
          nama: true,
          email: true,
          tandaTangan: true,
          role: true,
          image: true
        }
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(409).json({ message: 'Email sudah digunakan oleh pengguna lain.' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Check if user exists in any meetings
      const userInMeetings = await prisma.meetingParticipant.findFirst({
        where: { userId }
      });
      
      if (userInMeetings) {
        return res.status(409).json({ message: 'Tidak bisa menghapus pengguna karena masih tercatat dalam rapat.' });
      }
      
      await prisma.user.delete({ where: { id: userId } });
      res.status(200).json({ message: 'Pengguna berhasil dihapus' }); 
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 